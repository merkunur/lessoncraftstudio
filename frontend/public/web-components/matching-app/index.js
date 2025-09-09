import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class MatchingAppGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() { return 'matching-app'; }

  getDefaultTranslations() {
    return {
      en: { matchingApp: { title: 'Matching Worksheet', selectImages: 'Select Images to Match', matchingPairs: 'Number of Pairs (3-8)', generate: 'Generate Worksheet' } }
    };
  }

  getStyles() {
    return `:host { display: block; font-family: sans-serif; } .matching-app { display: flex; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 1rem; } .controls-panel { width: 340px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; } .settings-group { margin-bottom: 1.5rem; } .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; } .settings-group input { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; } .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-height: 200px; overflow-y: auto; } .image-item { padding: 0.5rem; border: 2px solid transparent; border-radius: 8px; cursor: pointer; background: #3a3a3e; text-align: center; } .image-item.selected { border-color: #007aff; } .image-item img { width: 30px; height: 30px; } .btn-primary { width: 100%; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #007aff; color: white; } .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; } .canvas-container canvas { border: 1px solid #dce1e6; max-width: 100%; }`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="matching-app">
        <div class="controls-panel">
          <h2>Matching Worksheet</h2>
          <div class="settings-group">
            <label for="pairCount">Number of Pairs (3-8)</label>
            <input type="number" id="pairCount" value="5" min="3" max="8">
          </div>
          <div class="image-selector">
            <h3>Select Images to Match</h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>
          <button id="generateBtn" class="btn-primary">Generate Worksheet</button>
        </div>
        <div class="preview-panel">
          <div class="canvas-container">
            <canvas id="worksheetCanvas" width="612" height="792"></canvas>
          </div>
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadBtn">Download</button>
          </div>
        </div>
      </div>
    `;
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
      if (this.selectedImages.includes(image.id || image.displayName)) item.classList.add('selected');
      item.innerHTML = `<img src="${image.url || '/images/placeholder.png'}"><span>${image.displayName}</span>`;
      item.addEventListener('click', () => this.toggleImage(image));
      imageGrid.appendChild(item);
    });
  }

  getSampleImages() {
    return [
      { id: 'apple', displayName: 'Apple', url: '/images/fruits/apple.png' },
      { id: 'cat', displayName: 'Cat', url: '/images/animals/cat.png' },
      { id: 'house', displayName: 'House', url: '/images/objects/house.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    if (index > -1) this.selectedImages.splice(index, 1);
    else if (this.selectedImages.length < 8) this.selectedImages.push(imageId);
    this.updateImageLibrary();
  }

  setupEventListeners() {
    this.shadowRoot.getElementById('generateBtn')?.addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('downloadBtn')?.addEventListener('click', () => this.downloadWorksheet());
  }

  initializeCanvas() {
    if (typeof fabric === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
      script.onload = () => this.createFabricCanvas();
      document.head.appendChild(script);
    } else this.createFabricCanvas();
  }

  createFabricCanvas() {
    const canvasElement = this.shadowRoot.getElementById('worksheetCanvas');
    if (!canvasElement || this.worksheetCanvas) return;
    this.worksheetCanvas = new fabric.Canvas(canvasElement, { backgroundColor: 'white', selection: false });
    this.fabricInstances.add(this.worksheetCanvas);
  }

  async generateWorksheet() {
    if (!this.worksheetCanvas || this.selectedImages.length === 0) return;
    this.worksheetCanvas.clear();
    
    const title = new fabric.Text('Match the Pictures', { left: 306, top: 40, fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', textAlign: 'center', originX: 'center' });
    this.worksheetCanvas.add(title);

    const pairCount = Math.min(parseInt(this.shadowRoot.getElementById('pairCount').value) || 5, this.selectedImages.length);
    const leftX = 100, rightX = 400, startY = 120;

    for (let i = 0; i < pairCount; i++) {
      const imageId = this.selectedImages[i];
      const images = this._images.length > 0 ? this._images : this.getSampleImages();
      const image = images.find(img => (img.id || img.displayName) === imageId);
      
      try {
        const imgElement = await this.loadImage(image?.url || '/images/placeholder.png');
        
        // Left side image
        const leftImg = new fabric.Image(imgElement, {
          left: leftX,
          top: startY + i * 80,
          scaleX: 40 / imgElement.width,
          scaleY: 40 / imgElement.height
        });
        
        // Right side image (shuffled position)
        const rightImg = new fabric.Image(imgElement, {
          left: rightX,
          top: startY + ((i + Math.floor(pairCount/2)) % pairCount) * 80,
          scaleX: 40 / imgElement.width,
          scaleY: 40 / imgElement.height
        });
        
        this.worksheetCanvas.add(leftImg, rightImg);
      } catch (e) {
        console.warn('Could not load image');
      }
    }

    this.shadowRoot.getElementById('actionButtons').style.display = 'flex';
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
    link.download = 'matching-worksheet.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => { try { canvas.dispose(); } catch (e) {} });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-matching-app', MatchingAppGenerator);
export default MatchingAppGenerator;