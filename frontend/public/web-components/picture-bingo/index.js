import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class PictureBingoGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() { return 'picture-bingo'; }

  getDefaultTranslations() {
    return {
      en: { pictureBingo: { title: 'Picture Bingo', selectImages: 'Select Images for Bingo', gridSize: 'Grid Size', generate: 'Generate Bingo Card' } }
    };
  }

  getStyles() {
    return `:host { display: block; font-family: sans-serif; } .picture-bingo-app { display: flex; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 1rem; } .controls-panel { width: 340px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; } .settings-group { margin-bottom: 1.5rem; } .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; } .settings-group select { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; } .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-height: 200px; overflow-y: auto; } .image-item { padding: 0.5rem; border: 2px solid transparent; border-radius: 8px; cursor: pointer; background: #3a3a3e; text-align: center; } .image-item.selected { border-color: #007aff; } .image-item img { width: 30px; height: 30px; } .btn-primary { width: 100%; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #007aff; color: white; } .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; } .canvas-container canvas { border: 1px solid #dce1e6; max-width: 100%; }`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="picture-bingo-app">
        <div class="controls-panel">
          <h2>Picture Bingo</h2>
          <div class="settings-group">
            <label for="gridSize">Grid Size</label>
            <select id="gridSize">
              <option value="3">3x3 Grid</option>
              <option value="4">4x4 Grid</option>
              <option value="5">5x5 Grid</option>
            </select>
          </div>
          <div class="image-selector">
            <h3>Select Images for Bingo</h3>
            <div id="imageGrid" class="image-grid"></div>
          </div>
          <button id="generateBtn" class="btn-primary">Generate Bingo Card</button>
        </div>
        <div class="preview-panel">
          <div class="canvas-container">
            <canvas id="worksheetCanvas" width="612" height="792"></canvas>
          </div>
          <div id="actionButtons" style="display: none;">
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
      { id: 'banana', displayName: 'Banana', url: '/images/fruits/banana.png' },
      { id: 'cat', displayName: 'Cat', url: '/images/animals/cat.png' },
      { id: 'dog', displayName: 'Dog', url: '/images/animals/dog.png' },
      { id: 'car', displayName: 'Car', url: '/images/vehicles/car.png' },
      { id: 'house', displayName: 'House', url: '/images/objects/house.png' },
      { id: 'star', displayName: 'Star', url: '/images/shapes/star.png' },
      { id: 'heart', displayName: 'Heart', url: '/images/shapes/heart.png' },
      { id: 'flower', displayName: 'Flower', url: '/images/nature/flower.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    const maxImages = parseInt(this.shadowRoot.getElementById('gridSize')?.value || '3') ** 2;
    if (index > -1) this.selectedImages.splice(index, 1);
    else if (this.selectedImages.length < maxImages) this.selectedImages.push(imageId);
    this.updateImageLibrary();
  }

  setupEventListeners() {
    this.shadowRoot.getElementById('generateBtn')?.addEventListener('click', () => this.generateBingo());
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

  async generateBingo() {
    if (!this.worksheetCanvas || this.selectedImages.length === 0) return;
    this.worksheetCanvas.clear();
    
    const title = new fabric.Text('BINGO', { left: 306, top: 40, fontFamily: 'Arial', fontSize: 32, fontWeight: 'bold', textAlign: 'center', originX: 'center' });
    this.worksheetCanvas.add(title);

    const gridSize = parseInt(this.shadowRoot.getElementById('gridSize').value) || 3;
    const cellSize = 400 / gridSize;
    const startX = 106;
    const startY = 100;
    
    // Draw grid
    for (let row = 0; row <= gridSize; row++) {
      const line = new fabric.Line([startX, startY + row * cellSize, startX + gridSize * cellSize, startY + row * cellSize], { stroke: '#000', strokeWidth: 2 });
      this.worksheetCanvas.add(line);
    }
    for (let col = 0; col <= gridSize; col++) {
      const line = new fabric.Line([startX + col * cellSize, startY, startX + col * cellSize, startY + gridSize * cellSize], { stroke: '#000', strokeWidth: 2 });
      this.worksheetCanvas.add(line);
    }

    // Fill grid with images
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const availableImages = images.filter(img => this.selectedImages.includes(img.id || img.displayName));
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Free space in center for 5x5
        if (gridSize === 5 && row === 2 && col === 2) {
          const freeText = new fabric.Text('FREE', { left: startX + col * cellSize + cellSize/2, top: startY + row * cellSize + cellSize/2, fontFamily: 'Arial', fontSize: 16, fontWeight: 'bold', textAlign: 'center', originX: 'center', originY: 'center' });
          this.worksheetCanvas.add(freeText);
          continue;
        }
        
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        if (randomImage) {
          try {
            const imgElement = await this.loadImage(randomImage.url || '/images/placeholder.png');
            const fabricImg = new fabric.Image(imgElement, {
              left: startX + col * cellSize + cellSize/2,
              top: startY + row * cellSize + cellSize/2,
              originX: 'center',
              originY: 'center',
              scaleX: (cellSize * 0.8) / imgElement.width,
              scaleY: (cellSize * 0.8) / imgElement.height
            });
            this.worksheetCanvas.add(fabricImg);
          } catch (e) {
            const shape = new fabric.Circle({
              left: startX + col * cellSize + cellSize/2,
              top: startY + row * cellSize + cellSize/2,
              radius: cellSize * 0.3,
              fill: '#007aff',
              originX: 'center',
              originY: 'center'
            });
            this.worksheetCanvas.add(shape);
          }
        }
      }
    }

    this.shadowRoot.getElementById('actionButtons').style.display = 'block';
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
    link.download = 'picture-bingo-card.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => { try { canvas.dispose(); } catch (e) {} });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-picture-bingo', PictureBingoGenerator);
export default PictureBingoGenerator;