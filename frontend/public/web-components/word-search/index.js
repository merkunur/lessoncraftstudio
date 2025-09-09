import { BaseWebComponent } from '../shared/BaseWebComponent.js';
import { WordSearchStyles } from './styles.js';
import { WordSearchEngine } from './engine.js';

class WordSearchGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.engine = new WordSearchEngine();
    this.currentPuzzle = null;
    this.selectedImages = new Set();
  }

  get appName() {
    return 'word-search';
  }

  getStyles() {
    return WordSearchStyles;
  }

  getDefaultTranslations() {
    return {
      en: {
        wordSearch: {
          title: 'Word Search Generator',
          gridSize: 'Grid Size',
          directions: 'Word Directions',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
          diagonal: 'Diagonal',
          backwards: 'Backwards',
          selectImages: 'Select Images (3-15)',
          generate: 'Generate Puzzle',
          regenerate: 'Regenerate',
          wordList: 'Find These Words',
          minImagesError: 'Please select at least 3 images',
          maxImagesError: 'Maximum 15 images allowed',
          generatingPuzzle: 'Generating puzzle...',
          puzzleGenerated: 'Puzzle generated successfully!'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear Selection'
        }
      },
      de: {
        wordSearch: {
          title: 'Wortsuchrätsel Generator',
          gridSize: 'Gittergröße',
          directions: 'Wortrichtungen',
          horizontal: 'Horizontal',
          vertical: 'Vertikal',
          diagonal: 'Diagonal',
          backwards: 'Rückwärts',
          selectImages: 'Bilder auswählen (3-15)',
          generate: 'Rätsel generieren',
          regenerate: 'Neu generieren',
          wordList: 'Finde diese Wörter',
          minImagesError: 'Bitte wählen Sie mindestens 3 Bilder aus',
          maxImagesError: 'Maximal 15 Bilder erlaubt',
          generatingPuzzle: 'Rätsel wird generiert...',
          puzzleGenerated: 'Rätsel erfolgreich generiert!'
        },
        common: {
          download: 'PDF herunterladen',
          print: 'Drucken',
          clear: 'Auswahl löschen'
        }
      },
      fr: {
        wordSearch: {
          title: 'Générateur de Mots Cachés',
          gridSize: 'Taille de la grille',
          directions: 'Directions des mots',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
          diagonal: 'Diagonal',
          backwards: 'À l\'envers',
          selectImages: 'Sélectionner des images (3-15)',
          generate: 'Générer le puzzle',
          regenerate: 'Régénérer',
          wordList: 'Trouvez ces mots',
          minImagesError: 'Veuillez sélectionner au moins 3 images',
          maxImagesError: 'Maximum 15 images autorisées',
          generatingPuzzle: 'Génération du puzzle...',
          puzzleGenerated: 'Puzzle généré avec succès!'
        },
        common: {
          download: 'Télécharger PDF',
          print: 'Imprimer',
          clear: 'Effacer la sélection'
        }
      }
    };
  }

  render() {
    const isPremium = this._subscription !== 'free';
    
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="word-search-app">
        <div class="controls-panel">
          <h2 data-i18n="wordSearch.title"></h2>
          
          <div class="settings-group">
            <label data-i18n="wordSearch.gridSize"></label>
            <select id="gridSize">
              <option value="8">8x8</option>
              <option value="10" selected>10x10</option>
              <option value="12" ${!isPremium ? 'disabled' : ''}>12x12${!isPremium ? ' (Premium)' : ''}</option>
              <option value="15" ${!isPremium ? 'disabled' : ''}>15x15${!isPremium ? ' (Premium)' : ''}</option>
            </select>
          </div>

          <div class="settings-group">
            <label data-i18n="wordSearch.directions"></label>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="horizontal" checked>
                <span data-i18n="wordSearch.horizontal"></span>
              </label>
              <label>
                <input type="checkbox" id="vertical" checked>
                <span data-i18n="wordSearch.vertical"></span>
              </label>
              <label ${!isPremium ? 'style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <input type="checkbox" id="diagonal" ${!isPremium ? 'disabled' : ''}>
                <span data-i18n="wordSearch.diagonal"></span>
                ${!isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
              </label>
              <label ${!isPremium ? 'style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <input type="checkbox" id="backwards" ${!isPremium ? 'disabled' : ''}>
                <span data-i18n="wordSearch.backwards"></span>
                ${!isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
              </label>
            </div>
          </div>

          <div class="image-selector">
            <h3 data-i18n="wordSearch.selectImages"></h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>

          <button id="generateBtn" class="btn-primary" data-i18n="wordSearch.generate">
            Generate Puzzle
          </button>

          <button id="clearBtn" class="btn-secondary" style="margin-top: 0.5rem; width: 100%;" data-i18n="common.clear">
            Clear Selection
          </button>
        </div>

        <div class="preview-panel">
          <div id="puzzleContainer" style="position: relative;">
            ${!isPremium ? '<div class="watermark">SAMPLE</div>' : ''}
            <div id="puzzlePreview"></div>
          </div>
          <div id="wordList"></div>
          
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadBtn" class="btn-secondary" data-i18n="common.download">
              Download
            </button>
            <button id="printBtn" class="btn-secondary" data-i18n="common.print">
              Print
            </button>
            <button id="regenerateBtn" class="btn-primary" data-i18n="wordSearch.regenerate">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    `;
    
    this.updateUIText();
    this.updateImageLibrary();
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
      if (this.selectedImages.has(image.id || image.displayName)) {
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
    // Default sample images for testing
    return [
      { id: 'cat', displayName: 'CAT', url: '/images/animals/cat.png' },
      { id: 'dog', displayName: 'DOG', url: '/images/animals/dog.png' },
      { id: 'bird', displayName: 'BIRD', url: '/images/animals/bird.png' },
      { id: 'fish', displayName: 'FISH', url: '/images/animals/fish.png' },
      { id: 'lion', displayName: 'LION', url: '/images/animals/lion.png' },
      { id: 'bear', displayName: 'BEAR', url: '/images/animals/bear.png' },
      { id: 'mouse', displayName: 'MOUSE', url: '/images/animals/mouse.png' },
      { id: 'rabbit', displayName: 'RABBIT', url: '/images/animals/rabbit.png' },
      { id: 'tiger', displayName: 'TIGER', url: '/images/animals/tiger.png' },
      { id: 'elephant', displayName: 'ELEPHANT', url: '/images/animals/elephant.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    
    if (this.selectedImages.has(imageId)) {
      this.selectedImages.delete(imageId);
    } else {
      if (this.selectedImages.size >= 15) {
        alert(this.getTranslation('wordSearch.maxImagesError'));
        return;
      }
      this.selectedImages.add(imageId);
    }
    
    // Update UI
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    const items = imageGrid.querySelectorAll('.image-item');
    items.forEach((item, index) => {
      const img = this._images.length > 0 ? this._images[index] : this.getSampleImages()[index];
      const imgId = img.id || img.displayName;
      if (this.selectedImages.has(imgId)) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');
    const regenerateBtn = this.shadowRoot.getElementById('regenerateBtn');

    generateBtn?.addEventListener('click', () => this.generatePuzzle());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadPuzzle());
    printBtn?.addEventListener('click', () => this.printPuzzle());
    regenerateBtn?.addEventListener('click', () => this.generatePuzzle());
  }

  clearSelection() {
    this.selectedImages.clear();
    this.updateImageLibrary();
  }

  async generatePuzzle() {
    const settings = this.getSettings();
    const selectedWords = this.getSelectedWords();
    
    if (selectedWords.length < 3) {
      alert(this.getTranslation('wordSearch.minImagesError'));
      return;
    }

    try {
      // Show loading state
      const generateBtn = this.shadowRoot.getElementById('generateBtn');
      generateBtn.disabled = true;
      generateBtn.textContent = this.getTranslation('wordSearch.generatingPuzzle');

      this.currentPuzzle = this.engine.generate({
        gridSize: settings.gridSize,
        directions: settings.directions,
        words: selectedWords
      });
      
      this.displayPuzzle();
      
      // Show success message
      this.emit('worksheet-generated', {
        type: 'word-search',
        data: this.currentPuzzle
      });

      // Reset button
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('wordSearch.generate');
      
      // Show action buttons
      const actionButtons = this.shadowRoot.getElementById('actionButtons');
      actionButtons.style.display = 'flex';
      
    } catch (error) {
      this.emit('error', { message: error.message });
      const generateBtn = this.shadowRoot.getElementById('generateBtn');
      generateBtn.disabled = false;
      generateBtn.textContent = this.getTranslation('wordSearch.generate');
    }
  }

  getSettings() {
    const gridSize = parseInt(this.shadowRoot.getElementById('gridSize').value);
    const horizontal = this.shadowRoot.getElementById('horizontal').checked;
    const vertical = this.shadowRoot.getElementById('vertical').checked;
    const diagonal = this.shadowRoot.getElementById('diagonal').checked;
    const backwards = this.shadowRoot.getElementById('backwards').checked;
    
    return {
      gridSize,
      directions: {
        horizontal,
        vertical,
        diagonal,
        backwards
      }
    };
  }

  getSelectedWords() {
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    return Array.from(this.selectedImages).map(id => {
      const img = images.find(i => (i.id || i.displayName) === id);
      return img ? img.displayName : id;
    });
  }

  displayPuzzle() {
    const preview = this.shadowRoot.getElementById('puzzlePreview');
    const wordList = this.shadowRoot.getElementById('wordList');
    
    // Display grid
    preview.innerHTML = this.renderGrid(this.currentPuzzle.grid);
    
    // Display word list
    wordList.innerHTML = this.renderWordList(this.currentPuzzle.words);
  }

  renderGrid(grid) {
    const gridSize = grid.length;
    let html = `<div class="puzzle-grid" style="grid-template-columns: repeat(${gridSize}, 1fr);">`;
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        html += `<div class="puzzle-cell">${grid[y][x]}</div>`;
      }
    }
    
    html += '</div>';
    return html;
  }

  renderWordList(words) {
    return `
      <div class="word-list-container">
        <h3 class="word-list-title" data-i18n="wordSearch.wordList">${this.getTranslation('wordSearch.wordList')}</h3>
        <div class="word-list-grid">
          ${words.map(word => `<div class="word-item">${word}</div>`).join('')}
        </div>
      </div>
    `;
  }

  downloadPuzzle() {
    // For now, create a simple printable version
    const printWindow = window.open('', '_blank');
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Word Search Puzzle</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .puzzle-grid { display: inline-grid; grid-template-columns: repeat(${this.currentPuzzle.gridSize}, 30px); gap: 2px; margin-bottom: 30px; }
          .puzzle-cell { width: 30px; height: 30px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; font-weight: bold; }
          .word-list { columns: 3; column-gap: 20px; }
          .word-item { break-inside: avoid; padding: 5px; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <h2>Word Search Puzzle</h2>
        ${this.shadowRoot.getElementById('puzzlePreview').innerHTML}
        <h3>Find These Words:</h3>
        <div class="word-list">
          ${this.currentPuzzle.words.map(w => `<div class="word-item">☐ ${w}</div>`).join('')}
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }

  printPuzzle() {
    this.downloadPuzzle();
  }
}

// Register the web component
customElements.define('lcs-word-search', WordSearchGenerator);

// Export for module usage
export default WordSearchGenerator;