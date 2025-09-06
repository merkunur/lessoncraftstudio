import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class FindAndCountGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() {
    return 'find-and-count';
  }

  getDefaultTranslations() {
    return {
      en: {
        findAndCount: {
          title: 'Find and Count Worksheet',
          selectImages: 'Select Images to Find',
          objectCount: 'Objects per Image (3-8)',
          includeDistractors: 'Include Distractor Images',
          generate: 'Generate Worksheet',
          noImagesError: 'Please select at least one image',
          generating: 'Creating worksheet...'
        }
      }
    };
  }

  getStyles() {
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .find-and-count-app { display: flex; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 1rem; }
      .controls-panel { width: 340px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; }
      .settings-group { margin-bottom: 1.5rem; }
      .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; }
      .settings-group input, .settings-group select { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; }
      .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-height: 200px; overflow-y: auto; }
      .image-item { padding: 0.5rem; border: 2px solid transparent; border-radius: 8px; cursor: pointer; background: #3a3a3e; transition: all 0.2s ease; text-align: center; }
      .image-item:hover { background: #4a4a4e; }
      .image-item.selected { border-color: #007aff; background: rgba(0, 122, 255, 0.1); }
      .image-item img { width: 30px; height: 30px; object-fit: contain; }
      .image-item span { font-size: 0.7rem; margin-top: 0.25rem; display: block; }
      .btn-primary { width: 100%; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #007aff; color: white; }
      .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; }
      .canvas-container canvas { border: 1px solid #dce1e6; border-radius: 8px; max-width: 100%; }
      .action-buttons { display: flex; gap: 0.75rem; margin-top: 1rem; justify-content: center; }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="find-and-count-app">
        <div class="controls-panel">
          <h2>Find and Count Worksheet</h2>
          
          <div class="settings-group">
            <label for="objectCount">Objects per Image (3-8)</label>
            <input type="number" id="objectCount" value="5" min="3" max="8">
          </div>
          
          <div class="image-selector">
            <h3>Select Images to Find</h3>
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
            <button id="printBtn">Print</button>
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
      if (this.selectedImages.includes(image.id || image.displayName)) {
        item.classList.add('selected');
      }
      
      item.innerHTML = `<img src="${image.url || '/images/placeholder.png'}" alt="${image.displayName}"><span>${image.displayName}</span>`;
      item.addEventListener('click', () => this.toggleImage(image));
      imageGrid.appendChild(item);
    });
  }

  getSampleImages() {
    return [
      { id: 'star', displayName: 'Star', url: '/images/shapes/star.png' },
      { id: 'heart', displayName: 'Heart', url: '/images/shapes/heart.png' },
      { id: 'circle', displayName: 'Circle', url: '/images/shapes/circle.png' },
      { id: 'square', displayName: 'Square', url: '/images/shapes/square.png' },
      { id: 'triangle', displayName: 'Triangle', url: '/images/shapes/triangle.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    const index = this.selectedImages.indexOf(imageId);
    
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      if (this.selectedImages.length >= 4) {
        alert('Maximum 4 images allowed');
        return;
      }
      this.selectedImages.push(imageId);
    }
    
    this.updateImageLibrary();
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');

    generateBtn?.addEventListener('click', () => this.generateWorksheet());
    downloadBtn?.addEventListener('click', () => this.downloadWorksheet());
    printBtn?.addEventListener('click', () => this.printWorksheet());
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
      selection: false
    });
    
    this.fabricInstances.add(this.worksheetCanvas);
  }

  async generateWorksheet() {
    if (this.selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    if (!this.worksheetCanvas) return;

    this.worksheetCanvas.clear();
    
    // Title
    const title = new fabric.Text('Find and Count', {
      left: 306,
      top: 40,
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(title);

    // Instructions
    const instructions = new fabric.Text('Count how many of each object you can find:', {
      left: 306,
      top: 80,
      fontFamily: 'Arial',
      fontSize: 14,
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(instructions);

    // Create find area with random objects
    await this.createFindArea();
    
    // Create count section
    await this.createCountSection();

    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    actionButtons.style.display = 'flex';
  }

  async createFindArea() {
    const areaWidth = 500;
    const areaHeight = 300;
    const startX = 56;
    const startY = 120;
    
    // Draw border around find area
    const border = new fabric.Rect({
      left: startX,
      top: startY,
      width: areaWidth,
      height: areaHeight,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2
    });
    this.worksheetCanvas.add(border);
    
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const selectedImageObjects = images.filter(img => 
      this.selectedImages.includes(img.id || img.displayName)
    );
    
    const objectCount = parseInt(this.shadowRoot.getElementById('objectCount').value) || 5;
    
    // Place random objects in the find area
    for (let i = 0; i < objectCount * selectedImageObjects.length; i++) {
      const randomImage = selectedImageObjects[Math.floor(Math.random() * selectedImageObjects.length)];
      const x = startX + 20 + Math.random() * (areaWidth - 60);
      const y = startY + 20 + Math.random() * (areaHeight - 60);
      
      try {
        const imgElement = await this.loadImage(randomImage.url || '/images/placeholder.png');
        const fabricImg = new fabric.Image(imgElement, {
          left: x,
          top: y,
          scaleX: 25 / imgElement.width,
          scaleY: 25 / imgElement.height
        });
        this.worksheetCanvas.add(fabricImg);
      } catch (e) {
        // Create a simple shape as fallback
        const shape = new fabric.Circle({
          left: x,
          top: y,
          radius: 12,
          fill: '#007aff',
          stroke: '#000',
          strokeWidth: 1
        });
        this.worksheetCanvas.add(shape);
      }
    }
  }

  async createCountSection() {
    let currentY = 450;
    const images = this._images.length > 0 ? this._images : this.getSampleImages();
    const selectedImageObjects = images.filter(img => 
      this.selectedImages.includes(img.id || img.displayName)
    );
    
    for (const image of selectedImageObjects) {
      try {
        const imgElement = await this.loadImage(image.url || '/images/placeholder.png');
        const fabricImg = new fabric.Image(imgElement, {
          left: 80,
          top: currentY,
          scaleX: 30 / imgElement.width,
          scaleY: 30 / imgElement.height
        });
        this.worksheetCanvas.add(fabricImg);
      } catch (e) {
        const shape = new fabric.Circle({
          left: 80,
          top: currentY,
          radius: 15,
          fill: '#007aff'
        });
        this.worksheetCanvas.add(shape);
      }
      
      const label = new fabric.Text(`Count the ${image.displayName}s:`, {
        left: 130,
        top: currentY + 5,
        fontFamily: 'Arial',
        fontSize: 16
      });
      
      const answerBox = new fabric.Rect({
        left: 300,
        top: currentY,
        width: 40,
        height: 30,
        fill: 'transparent',
        stroke: '#000',
        strokeWidth: 1
      });
      
      this.worksheetCanvas.add(label, answerBox);
      currentY += 50;
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
    link.download = 'find-and-count-worksheet.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  printWorksheet() {
    if (!this.worksheetCanvas) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Find and Count</title></head><body style="margin:0;"><img src="${this.worksheetCanvas.toDataURL()}" style="max-width:100%;"></body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => {
      try { canvas.dispose(); } catch (e) { console.warn('Error disposing canvas:', e); }
    });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-find-and-count', FindAndCountGenerator);
export default FindAndCountGenerator;