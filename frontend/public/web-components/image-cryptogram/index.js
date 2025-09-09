import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class ImageCryptogramGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() { return 'image-cryptogram'; }

  getDefaultTranslations() {
    return {
      en: {
        imageCryptogram: {
          title: 'Image Cryptogram',
          generateWorksheet: 'Generate Worksheet',
          download: 'Download',
          generating: 'Generating image cryptogram...'
        }
      }
    };
  }

  getStyles() {
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
      .layout { display: flex; height: 80vh; min-height: 600px; }
      .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; }
      .main { flex: 1; background: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 20px; }
      canvas { border: 1px solid #ddd; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      button { cursor: pointer; padding: 10px 20px; width: 100%; margin: 5px 0; background: #007aff; color: white; border: none; border-radius: 5px; }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2>Image Cryptogram</h2>
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
    if (!this._images) return;
    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    const canvas = this.shadowRoot.getElementById('worksheetCanvas');
    this.worksheetCanvas = new fabric.Canvas(canvas);
    
    const title = new fabric.Text('Image Cryptogram - Decode the Message', {
      left: this.worksheetCanvas.width / 2, top: 30, fontSize: 20, originX: 'center', fontWeight: 'bold'
    });
    this.worksheetCanvas.add(title);

    const selectedImages = this._images.slice(0, 8);
    const imageSize = 40, startX = 50, startY = 100;

    // Create symbol key
    selectedImages.forEach((image, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      const x = startX + col * 120;
      const y = startY + row * 60;
      
      this.createFabricImage(image.url, imageSize, x, y);
      
      const letter = String.fromCharCode(65 + index); // A, B, C, etc.
      const letterText = new fabric.Text(`= ${letter}`, {
        left: x + imageSize + 10, top: y + imageSize/2 - 8, fontSize: 16
      });
      this.worksheetCanvas.add(letterText);
    });

    // Create encoded message
    const message = "HELLO WORLD";
    const messageY = startY + 200;
    message.split('').forEach((char, index) => {
      if (char === ' ') return;
      const imageIndex = char.charCodeAt(0) - 65;
      if (imageIndex >= 0 && imageIndex < selectedImages.length) {
        this.createFabricImage(selectedImages[imageIndex].url, 30, startX + index * 35, messageY);
      }
    });

    this.emit('worksheet-generated', { type: 'image-cryptogram', message });
  }

  async createFabricImage(src, size, x, y) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(src, (img) => {
        img.set({ left: x, top: y, scaleX: size / img.width, scaleY: size / img.height, selectable: false });
        this.worksheetCanvas.add(img);
        resolve(img);
      });
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
      link.download = 'image-cryptogram.png'; link.href = this.worksheetCanvas.toDataURL(); link.click();
    });
  }

  cleanup() { this.fabricInstances.forEach(instance => instance?.dispose()); }
}

customElements.define('lcs-image-cryptogram', ImageCryptogramGenerator);