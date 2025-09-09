import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class DrawAndColorGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
    this.drawingCanvas = null;
  }

  get appName() {
    return 'draw-and-color';
  }

  getDefaultTranslations() {
    return {
      en: {
        drawAndColor: {
          title: 'Draw and Color',
          pageSetup: 'Page Setup',
          drawingTools: 'Drawing Tools',
          brushSize: 'Brush Size',
          drawingColor: 'Drawing Color',
          imageLibrary: 'Image Library',
          generateWorksheet: 'Generate Worksheet',
          clearDrawing: 'Clear Drawing',
          download: 'Download',
          print: 'Print',
          generating: 'Generating draw and color worksheet...'
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
      
      .layout {
        display: flex;
        height: 80vh;
        min-height: 600px;
      }
      
      .panel {
        width: 340px;
        background: #2c2c2e;
        color: #e0e0e0;
        padding: 20px;
        overflow-y: auto;
      }
      
      .main {
        flex: 1;
        background: #f0f2f5;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      
      canvas {
        border: 1px solid #ddd;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      .controls {
        margin-bottom: 20px;
      }
      
      .controls label {
        display: block;
        margin-bottom: 8px;
        font-size: 13px;
        color: #a0a0a0;
      }
      
      .controls input, .controls select, .controls button {
        width: 100%;
        padding: 8px;
        margin-bottom: 12px;
        border: 1px solid #4a4a4a;
        background: #3a3a3e;
        color: #e0e0e0;
        border-radius: 5px;
      }
      
      button {
        cursor: pointer;
        padding: 10px 20px;
        font-weight: 500;
      }
      
      button:hover {
        background: #4f4f53;
      }
      
      .action-button {
        background: #007aff;
        color: white;
        border: none;
        margin: 5px;
      }
      
      .action-button:hover {
        background: #005ecb;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <h2>Draw and Color</h2>
          
          <div class="controls">
            <label>Brush Size:</label>
            <input type="range" id="brushSize" min="1" max="20" value="5">
            
            <label>Drawing Color:</label>
            <input type="color" id="drawingColor" value="#000000">
            
            <button id="clearBtn">Clear Drawing</button>
          </div>
          
          <div class="controls">
            <button id="generateBtn" class="action-button">Generate Worksheet</button>
            <button id="downloadBtn" class="action-button">Download</button>
            <button id="printBtn" class="action-button">Print</button>
          </div>
        </div>
        
        <div class="main">
          <canvas id="drawingCanvas" width="600" height="400"></canvas>
        </div>
      </div>
    `;
    
    this.initializeCanvas();
  }

  initializeCanvas() {
    const canvas = this.shadowRoot.getElementById('drawingCanvas');
    this.drawingCanvas = canvas;
    const ctx = canvas.getContext('2d');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      
      const brushSize = this.shadowRoot.getElementById('brushSize').value;
      const color = this.shadowRoot.getElementById('drawingColor').value;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  }

  setupEventListeners() {
    this.shadowRoot.getElementById('clearBtn').addEventListener('click', () => {
      const ctx = this.drawingCanvas.getContext('2d');
      ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    });
    
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => {
      this.generateWorksheet();
    });
    
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => {
      this.downloadWorksheet();
    });
    
    this.shadowRoot.getElementById('printBtn').addEventListener('click', () => {
      this.printWorksheet();
    });
  }

  generateWorksheet() {
    this.emit('worksheet-generated', {
      type: 'draw-and-color',
      canvas: this.drawingCanvas.toDataURL()
    });
  }

  downloadWorksheet() {
    const link = document.createElement('a');
    link.download = 'draw-and-color.png';
    link.href = this.drawingCanvas.toDataURL();
    link.click();
  }

  printWorksheet() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="${this.drawingCanvas.toDataURL()}">`);
    printWindow.print();
  }
}

customElements.define('lcs-draw-and-color', DrawAndColorGenerator);