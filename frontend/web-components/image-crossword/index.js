import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class ImageCrosswordGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
    this.crosswordGrid = [];
  }

  get appName() { return 'image-crossword'; }

  getDefaultTranslations() {
    return {
      en: {
        imageCrossword: {
          title: 'Image Crossword',
          generateWorksheet: 'Generate Worksheet',
          generateAnswerKey: 'Generate Answer Key',
          download: 'Download',
          worksheet: 'Worksheet',
          answerKey: 'Answer Key',
          generating: 'Generating image crossword...'
        }
      }
    };
  }

  getStyles() {
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
      .layout { display: flex; height: 80vh; min-height: 600px; }
      .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; overflow-y: auto; }
      .main { flex: 1; background: #f0f2f5; display: flex; flex-direction: column; }
      .tabs { display: flex; border-bottom: 1px solid #ddd; background: white; }
      .tab { padding: 12px 24px; cursor: pointer; border-bottom: 2px solid transparent; }
      .tab.active { border-bottom-color: #007aff; color: #007aff; }
      .tab-content { flex: 1; display: flex; justify-content: center; align-items: center; padding: 20px; }
      canvas { border: 1px solid #ddd; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      button { cursor: pointer; padding: 10px 20px; font-weight: 500; width: 100%; margin: 5px 0; background: #007aff; color: white; border: none; border-radius: 5px; }
      button:hover { background: #005ecb; }
      button:disabled { background: #666; cursor: not-allowed; }
      .hidden { display: none; }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2>Image Crossword</h2>
          <button id="generateBtn">Generate Worksheet</button>
          <button id="generateAnswerBtn" disabled>Generate Answer Key</button>
          <button id="downloadBtn">Download</button>
        </div>
        <div class="main">
          <div class="tabs">
            <div class="tab active" data-tab="worksheet">Worksheet</div>
            <div class="tab" data-tab="answer">Answer Key</div>
          </div>
          <div class="tab-content" id="worksheetTab">
            <canvas id="worksheetCanvas" width="612" height="792"></canvas>
          </div>
          <div class="tab-content hidden" id="answerTab">
            <canvas id="answerCanvas" width="612" height="792"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  async generateWorksheet() {
    if (!this._images || this._images.length < 5) return;

    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    const worksheetCanvas = this.shadowRoot.getElementById('worksheetCanvas');
    const answerCanvas = this.shadowRoot.getElementById('answerCanvas');
    
    this.worksheetCanvas = new fabric.Canvas(worksheetCanvas);
    this.answerKeyCanvas = new fabric.Canvas(answerCanvas);
    this.fabricInstances.add(this.worksheetCanvas);
    this.fabricInstances.add(this.answerKeyCanvas);

    // Create simple crossword layout
    const title = new fabric.Text('Image Crossword', {
      left: this.worksheetCanvas.width / 2, top: 30, fontSize: 24, fontFamily: 'Arial',
      fill: '#000000', originX: 'center', fontWeight: 'bold'
    });
    this.worksheetCanvas.add(title);
    this.answerKeyCanvas.add(title.clone());

    // Create grid and clues
    const selectedImages = this._images.slice(0, 5);
    const gridSize = 20;
    const startX = 100, startY = 100;

    // Simple 5x5 grid
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const square = new fabric.Rect({
          left: startX + col * gridSize,
          top: startY + row * gridSize,
          width: gridSize,
          height: gridSize,
          fill: 'white',
          stroke: '#000',
          strokeWidth: 1,
          selectable: false
        });
        this.worksheetCanvas.add(square);
        this.answerKeyCanvas.add(square.clone());
      }
    }

    // Add image clues
    selectedImages.forEach((image, index) => {
      const clueY = startY + 150 + index * 60;
      
      // Clue number and image
      const clueNum = new fabric.Text(`${index + 1}.`, {
        left: 50, top: clueY, fontSize: 16, fontFamily: 'Arial', fill: '#000000'
      });
      this.worksheetCanvas.add(clueNum);
      this.answerKeyCanvas.add(clueNum.clone());

      this.createFabricImage(image.url, 40, 80, clueY - 5, this.worksheetCanvas);
      this.createFabricImage(image.url, 40, 80, clueY - 5, this.answerKeyCanvas);

      // Answer on answer key
      const answer = new fabric.Text(image.displayName.toUpperCase().substring(0, 5), {
        left: startX + 10, top: startY + index * gridSize + 5,
        fontSize: 12, fontFamily: 'Arial', fill: '#ff0000'
      });
      this.answerKeyCanvas.add(answer);
    });

    this.shadowRoot.getElementById('generateAnswerBtn').disabled = false;
    this.emit('worksheet-generated', { type: 'image-crossword', words: selectedImages.map(img => img.displayName) });
  }

  async createFabricImage(src, size, x, y, canvas) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(src, (img) => {
        img.set({ left: x, top: y, scaleX: size / img.width, scaleY: size / img.height, selectable: false });
        canvas.add(img);
        resolve(img);
      }, { crossOrigin: 'anonymous' });
    });
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src; script.onload = resolve; script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setupEventListeners() {
    this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.shadowRoot.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));

        e.target.classList.add('active');
        const tabId = e.target.dataset.tab === 'worksheet' ? 'worksheetTab' : 'answerTab';
        this.shadowRoot.getElementById(tabId).classList.remove('hidden');
      });
    });

    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('generateAnswerBtn').addEventListener('click', () => {
      this.shadowRoot.querySelector('[data-tab="answer"]').click();
    });
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'image-crossword.png';
      link.href = this.worksheetCanvas.toDataURL();
      link.click();
    });

    // Auto-generate initial worksheet
    this.generateInitialWorksheet();
  }

  generateInitialWorksheet() {
    // Generate worksheet automatically after a short delay
    setTimeout(() => {
      this.generateWorksheet();
    }, 100);
  }

  cleanup() { this.fabricInstances.forEach(instance => instance?.dispose()); this.fabricInstances.clear(); }
}

customElements.define('lcs-image-crossword', ImageCrosswordGenerator);