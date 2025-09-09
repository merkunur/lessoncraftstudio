import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class FindObjectsGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() {
    return 'find-objects';
  }

  getDefaultTranslations() {
    return {
      en: {
        findObjects: {
          title: 'Find Objects',
          selectImages: 'Select Images to Find',
          objectsToFind: 'Number of Objects to Find (3-10)',
          backgroundImages: 'Background Images (5-20)',
          generateWorksheet: 'Generate Worksheet',
          download: 'Download',
          generating: 'Generating find objects worksheet...'
        }
      }
    };
  }

  getStyles() {
    return `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      }
      .layout { display: flex; height: 80vh; min-height: 600px; }
      .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; overflow-y: auto; }
      .main { flex: 1; background: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 20px; }
      canvas { border: 1px solid #ddd; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .controls { margin-bottom: 20px; }
      .controls label { display: block; margin-bottom: 8px; font-size: 13px; color: #a0a0a0; }
      .controls input, .controls select, .controls button { width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 5px; }
      button { cursor: pointer; padding: 10px 20px; font-weight: 500; }
      button:hover { background: #4f4f53; }
      .action-button { background: #007aff; color: white; border: none; margin: 5px; }
      .action-button:hover { background: #005ecb; }
      .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; max-height: 200px; overflow-y: auto; }
      .image-item { cursor: pointer; text-align: center; padding: 5px; border: 2px solid transparent; border-radius: 5px; }
      .image-item:hover, .image-item.selected { border-color: #007aff; }
      .image-item img { width: 50px; height: 50px; object-fit: contain; }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2>Find Objects</h2>
          <div class="controls">
            <label>Objects to Find:</label>
            <input type="number" id="objectCount" value="5" min="3" max="10">
            <label>Background Items:</label>
            <input type="number" id="backgroundCount" value="15" min="5" max="20">
            <button id="generateBtn" class="action-button">Generate Worksheet</button>
            <button id="downloadBtn" class="action-button">Download</button>
          </div>
          <div class="image-grid" id="imageGrid"></div>
        </div>
        <div class="main">
          <canvas id="worksheetCanvas" width="612" height="792"></canvas>
        </div>
      </div>
    `;
    
    this.loadImageLibrary();
  }

  async loadImageLibrary() {
    if (!this._images || this._images.length === 0) return;
    
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    imageGrid.innerHTML = '';
    
    this._images.slice(0, 50).forEach(image => {
      const item = document.createElement('div');
      item.className = 'image-item';
      item.innerHTML = `<img src="${image.url}" alt="${image.displayName}"><br><small>${image.displayName}</small>`;
      item.addEventListener('click', () => this.toggleImageSelection(image, item));
      imageGrid.appendChild(item);
    });
  }

  toggleImageSelection(image, element) {
    const index = this.selectedImages.findIndex(img => img.fileKey === image.fileKey);
    if (index === -1) {
      this.selectedImages.push(image);
      element.classList.add('selected');
    } else {
      this.selectedImages.splice(index, 1);
      element.classList.remove('selected');
    }
  }

  async generateWorksheet() {
    if (this.selectedImages.length < 5) {
      alert('Please select at least 5 images');
      return;
    }

    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    const canvas = this.shadowRoot.getElementById('worksheetCanvas');
    this.worksheetCanvas = new fabric.Canvas(canvas);
    this.fabricInstances.add(this.worksheetCanvas);

    const objectCount = parseInt(this.shadowRoot.getElementById('objectCount').value);
    const backgroundCount = parseInt(this.shadowRoot.getElementById('backgroundCount').value);

    // Add title
    const title = new fabric.Text('Find the Objects', {
      left: this.worksheetCanvas.width / 2,
      top: 30,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
      originX: 'center',
      fontWeight: 'bold'
    });
    this.worksheetCanvas.add(title);

    // Add objects to find at top
    const objectsToFind = this.selectedImages.slice(0, objectCount);
    const objectSize = 40;
    const startX = 50;

    objectsToFind.forEach((image, index) => {
      this.createFabricImage(image.url, objectSize, startX + index * 60, 80);
    });

    // Scatter objects in main area
    const allImages = [...objectsToFind, ...this.selectedImages.slice(objectCount, objectCount + backgroundCount)];
    
    for (let i = 0; i < Math.min(allImages.length, backgroundCount + objectCount); i++) {
      const image = allImages[i % allImages.length];
      const x = Math.random() * (this.worksheetCanvas.width - 80) + 40;
      const y = Math.random() * (this.worksheetCanvas.height - 200) + 150;
      this.createFabricImage(image.url, 35, x, y);
    }

    this.emit('worksheet-generated', { type: 'find-objects', objectsToFind: objectsToFind.map(img => img.displayName) });
  }

  async createFabricImage(src, size, x, y) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(src, (img) => {
        img.set({
          left: x,
          top: y,
          scaleX: size / img.width,
          scaleY: size / img.height,
          selectable: false
        });
        this.worksheetCanvas.add(img);
        resolve(img);
      }, { crossOrigin: 'anonymous' });
    });
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
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'find-objects.png';
      link.href = this.worksheetCanvas.toDataURL();
      link.click();
    });
  }

  cleanup() {
    this.fabricInstances.forEach(instance => instance?.dispose());
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-find-objects', FindObjectsGenerator);