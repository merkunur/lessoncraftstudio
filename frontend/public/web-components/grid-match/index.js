import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class GridMatchGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() { return 'grid-match'; }

  getDefaultTranslations() {
    return {
      en: {
        gridMatch: {
          title: 'Grid Match',
          generateWorksheet: 'Generate Worksheet',
          download: 'Download',
          generating: 'Generating grid match worksheet...'
        }
      }
    };
  }

  getStyles() {
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
      .layout { display: flex; height: 80vh; min-height: 600px; }
      .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; overflow-y: auto; }
      .main { flex: 1; background: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 20px; }
      canvas { border: 1px solid #ddd; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      button { cursor: pointer; padding: 10px 20px; font-weight: 500; width: 100%; margin: 5px 0; background: #007aff; color: white; border: none; border-radius: 5px; }
      button:hover { background: #005ecb; }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2>Grid Match</h2>
          <button id="generateBtn">Generate Worksheet</button>
          <button id="downloadBtn">Download</button>
        </div>
        <div class="main">
          <canvas id="worksheetCanvas" width="612" height="792"></canvas>
        </div>
      </div>
    `;
  }

  async generateWorksheet() {
    if (!this._images || this._images.length < 6) return;

    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    const canvas = this.shadowRoot.getElementById('worksheetCanvas');
    this.worksheetCanvas = new fabric.Canvas(canvas);
    this.fabricInstances.add(this.worksheetCanvas);

    const title = new fabric.Text('Match the Images', {
      left: this.worksheetCanvas.width / 2, top: 30, fontSize: 24, fontFamily: 'Arial',
      fill: '#000000', originX: 'center', fontWeight: 'bold'
    });
    this.worksheetCanvas.add(title);

    const selectedImages = this._images.slice(0, 6);
    const leftColumn = 100, rightColumn = 400, imageSize = 50, spacing = 80;

    // Left column - ordered
    selectedImages.forEach((image, index) => {
      this.createFabricImage(image.url, imageSize, leftColumn, 100 + index * spacing);
    });

    // Right column - shuffled
    const shuffled = [...selectedImages].sort(() => Math.random() - 0.5);
    shuffled.forEach((image, index) => {
      this.createFabricImage(image.url, imageSize, rightColumn, 100 + index * spacing);
    });

    this.emit('worksheet-generated', { type: 'grid-match', images: selectedImages.map(img => img.displayName) });
  }

  async createFabricImage(src, size, x, y) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(src, (img) => {
        img.set({ left: x, top: y, scaleX: size / img.width, scaleY: size / img.height, selectable: false });
        this.worksheetCanvas.add(img);
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
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'grid-match.png'; link.href = this.worksheetCanvas.toDataURL(); link.click();
    });
  }

  cleanup() { this.fabricInstances.forEach(instance => instance?.dispose()); this.fabricInstances.clear(); }
}

customElements.define('lcs-grid-match', GridMatchGenerator);