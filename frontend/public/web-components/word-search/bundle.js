// Word Search Web Component Bundle
// This is a simplified version for development

// Base Web Component Class
class BaseWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._locale = 'en';
    this._config = {};
    this._subscription = 'free';
    this._images = [];
    this._translations = {};
  }

  static get observedAttributes() {
    return ['locale', 'config', 'subscription', 'images'];
  }

  get locale() { return this._locale; }
  set locale(value) {
    this._locale = value;
    this.render();
  }

  get config() { return this._config; }
  set config(value) {
    this._config = typeof value === 'string' ? JSON.parse(value) : value;
    this.render();
  }

  get subscription() { return this._subscription; }
  set subscription(value) {
    this._subscription = value;
    this.updateFeatures();
  }

  get images() { return this._images; }
  set images(value) {
    this._images = typeof value === 'string' ? JSON.parse(value) : value;
    this.updateImageLibrary();
  }

  connectedCallback() {
    this.loadStyles();
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  loadStyles() {
    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);
  }

  updateFeatures() {
    const isPremium = this._subscription !== 'free';
    this.shadowRoot.querySelectorAll('[data-premium]').forEach(el => {
      el.style.display = isPremium ? '' : 'none';
    });
  }

  updateImageLibrary() {
    // Override in child classes
  }

  emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  getStyles() {
    return '';
  }

  render() {
    // Override in child classes
  }

  setupEventListeners() {
    // Override in child classes
  }
}

// Word Search Engine
class WordSearchEngine {
  constructor() {
    this.grid = [];
    this.placedWords = [];
  }

  generate(options) {
    const { gridSize = 10, words = [], directions = ['horizontal', 'vertical'] } = options;
    
    // Initialize grid
    this.grid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => '')
    );
    
    this.placedWords = [];
    
    // Sort words by length (longer first)
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    
    // Try to place each word
    for (const word of sortedWords) {
      const placed = this.placeWord(word.toUpperCase(), gridSize, directions);
      if (placed) {
        this.placedWords.push(placed);
      }
    }
    
    // Fill empty cells with random letters
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!this.grid[row][col]) {
          this.grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    
    return {
      grid: this.grid,
      words: this.placedWords
    };
  }

  placeWord(word, gridSize, directions) {
    const maxAttempts = 100;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const position = this.getRandomPosition(word, gridSize, direction);
      
      if (this.canPlaceWord(word, position, direction, gridSize)) {
        this.doPlaceWord(word, position, direction);
        return {
          word,
          position,
          direction
        };
      }
    }
    
    return null;
  }

  getRandomPosition(word, gridSize, direction) {
    let row, col;
    
    if (direction === 'horizontal') {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * (gridSize - word.length + 1));
    } else if (direction === 'vertical') {
      row = Math.floor(Math.random() * (gridSize - word.length + 1));
      col = Math.floor(Math.random() * gridSize);
    } else if (direction === 'diagonal') {
      row = Math.floor(Math.random() * (gridSize - word.length + 1));
      col = Math.floor(Math.random() * (gridSize - word.length + 1));
    }
    
    return { row, col };
  }

  canPlaceWord(word, position, direction, gridSize) {
    const { row, col } = position;
    
    for (let i = 0; i < word.length; i++) {
      let r = row;
      let c = col;
      
      if (direction === 'horizontal') {
        c = col + i;
      } else if (direction === 'vertical') {
        r = row + i;
      } else if (direction === 'diagonal') {
        r = row + i;
        c = col + i;
      }
      
      if (r >= gridSize || c >= gridSize) {
        return false;
      }
      
      if (this.grid[r][c] && this.grid[r][c] !== word[i]) {
        return false;
      }
    }
    
    return true;
  }

  doPlaceWord(word, position, direction) {
    const { row, col } = position;
    
    for (let i = 0; i < word.length; i++) {
      let r = row;
      let c = col;
      
      if (direction === 'horizontal') {
        c = col + i;
      } else if (direction === 'vertical') {
        r = row + i;
      } else if (direction === 'diagonal') {
        r = row + i;
        c = col + i;
      }
      
      this.grid[r][c] = word[i];
    }
  }
}

// Word Search Styles
const WordSearchStyles = `
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  .word-search-app {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    padding: 2rem;
    background: #f8f9fa;
    min-height: 600px;
  }
  
  .controls-panel {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .settings-group {
    margin-bottom: 1.5rem;
  }
  
  .settings-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  select, input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: center;
    font-weight: normal;
    cursor: pointer;
  }
  
  .checkbox-group input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .image-item {
    aspect-ratio: 1;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    font-size: 12px;
    text-align: center;
    padding: 0.25rem;
  }
  
  .image-item:hover {
    border-color: #007bff;
  }
  
  .image-item.selected {
    border-color: #28a745;
    background: #d4edda;
  }
  
  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  
  .btn-secondary {
    padding: 0.5rem 1rem;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn-secondary:hover {
    background: #545b62;
  }
  
  .preview-panel {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  #puzzlePreview {
    margin-bottom: 2rem;
  }
  
  .puzzle-grid {
    display: inline-block;
    border: 2px solid #333;
    background: white;
  }
  
  .puzzle-row {
    display: flex;
  }
  
  .puzzle-cell {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 16px;
  }
  
  #wordList {
    margin-top: 2rem;
  }
  
  .word-list-title {
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .word-list-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .word-item {
    padding: 0.25rem 0.5rem;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 72px;
    color: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 10;
  }
`;

// Word Search Generator Component
class WordSearchGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.engine = new WordSearchEngine();
    this.currentPuzzle = null;
    this.selectedWords = [];
  }

  get appName() {
    return 'word-search';
  }

  getStyles() {
    return WordSearchStyles;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="word-search-app">
        <div class="controls-panel">
          <h2>Word Search Generator</h2>
          
          <div class="settings-group">
            <label>Grid Size</label>
            <select id="gridSize">
              <option value="8">8x8</option>
              <option value="10" selected>10x10</option>
              <option value="12">12x12</option>
              <option value="15">15x15</option>
            </select>
          </div>

          <div class="settings-group">
            <label>Word Directions</label>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" id="horizontal" checked>
                <span>Horizontal</span>
              </label>
              <label>
                <input type="checkbox" id="vertical" checked>
                <span>Vertical</span>
              </label>
              <label>
                <input type="checkbox" id="diagonal">
                <span>Diagonal</span>
              </label>
            </div>
          </div>

          <div class="settings-group">
            <label>Enter Words (one per line)</label>
            <textarea id="wordInput" rows="6" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
CAT
DOG
BIRD
FISH
MOUSE</textarea>
          </div>

          <button id="generateBtn" class="btn-primary">
            Generate Puzzle
          </button>
        </div>

        <div class="preview-panel">
          ${this._subscription === 'free' ? '<div class="watermark">SAMPLE</div>' : ''}
          <div id="puzzlePreview"></div>
          <div id="wordList"></div>
          
          <div class="action-buttons" style="display: none;">
            <button id="downloadBtn" class="btn-secondary">
              Download PDF
            </button>
            <button id="printBtn" class="btn-secondary">
              Print
            </button>
          </div>
        </div>
      </div>
    `;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');

    generateBtn?.addEventListener('click', () => this.generatePuzzle());
    downloadBtn?.addEventListener('click', () => this.downloadPuzzle());
    printBtn?.addEventListener('click', () => this.printPuzzle());
  }

  generatePuzzle() {
    const gridSize = parseInt(this.shadowRoot.getElementById('gridSize').value);
    const wordInput = this.shadowRoot.getElementById('wordInput').value;
    const words = wordInput.split('\n').filter(w => w.trim()).map(w => w.trim());
    
    if (words.length < 3) {
      alert('Please enter at least 3 words');
      return;
    }
    
    const directions = [];
    if (this.shadowRoot.getElementById('horizontal').checked) directions.push('horizontal');
    if (this.shadowRoot.getElementById('vertical').checked) directions.push('vertical');
    if (this.shadowRoot.getElementById('diagonal').checked) directions.push('diagonal');
    
    if (directions.length === 0) {
      alert('Please select at least one direction');
      return;
    }
    
    this.currentPuzzle = this.engine.generate({
      gridSize,
      words,
      directions
    });
    
    this.displayPuzzle();
    this.emit('worksheet-generated', {
      type: 'word-search',
      data: this.currentPuzzle
    });
  }

  displayPuzzle() {
    const preview = this.shadowRoot.getElementById('puzzlePreview');
    const wordList = this.shadowRoot.getElementById('wordList');
    const actionButtons = this.shadowRoot.querySelector('.action-buttons');
    
    // Display grid
    let gridHTML = '<div class="puzzle-grid">';
    for (const row of this.currentPuzzle.grid) {
      gridHTML += '<div class="puzzle-row">';
      for (const cell of row) {
        gridHTML += `<div class="puzzle-cell">${cell}</div>`;
      }
      gridHTML += '</div>';
    }
    gridHTML += '</div>';
    preview.innerHTML = gridHTML;
    
    // Display word list
    const words = this.currentPuzzle.words.map(w => w.word);
    wordList.innerHTML = `
      <div class="word-list-title">Find These Words:</div>
      <div class="word-list-grid">
        ${words.map(word => `<div class="word-item">${word}</div>`).join('')}
      </div>
    `;
    
    // Show action buttons
    actionButtons.style.display = 'flex';
  }

  downloadPuzzle() {
    // In production, this would generate a PDF
    alert('Download feature coming soon!');
  }

  printPuzzle() {
    window.print();
  }
}

// Register the custom element
customElements.define('lcs-word-search', WordSearchGenerator);