import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class MathWorksheetGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
    this.currentProblems = [];
  }

  get appName() {
    return 'math-worksheet';
  }

  getDefaultTranslations() {
    return {
      en: {
        mathWorksheet: {
          title: 'Math Worksheet Generator',
          operation: 'Operation',
          addition: 'Addition',
          subtraction: 'Subtraction',
          multiplication: 'Multiplication',
          division: 'Division',
          problemCount: 'Number of Problems (10-25)',
          minNumber: 'Minimum Number',
          maxNumber: 'Maximum Number',
          includeAnswers: 'Include Answer Key',
          generate: 'Generate Worksheet',
          generating: 'Creating worksheet...'
        },
        common: {
          download: 'Download PDF',
          print: 'Print',
          clear: 'Clear'
        }
      }
    };
  }

  getStyles() {
    return `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .math-worksheet-app {
        display: flex;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
      
      .controls-panel {
        width: 340px;
        min-width: 340px;
        background: #2c2c2e;
        color: #e0e0e0;
        border-radius: 12px;
        padding: 1.5rem;
        height: fit-content;
      }
      
      .settings-group {
        margin-bottom: 1.5rem;
      }
      
      .settings-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #a0a0a0;
      }
      
      .settings-group input, .settings-group select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #4a4a4a;
        background: #3a3a3e;
        color: #e0e0e0;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      
      .btn-primary {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        background: #007aff;
        color: white;
        transition: background-color 0.2s ease;
      }
      
      .btn-primary:hover {
        background: #005ecb;
      }
      
      .btn-primary:disabled {
        background: #4a4a4a;
        cursor: not-allowed;
      }
      
      .preview-panel {
        flex: 1;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        min-height: 600px;
      }
      
      .canvas-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      }
      
      .canvas-container canvas {
        border: 1px solid #dce1e6;
        border-radius: 8px;
        max-width: 100%;
        height: auto;
      }
      
      .action-buttons {
        display: flex;
        gap: 0.75rem;
        margin-top: 1rem;
        justify-content: center;
      }
      
      .action-buttons button {
        width: auto;
        padding: 0.5rem 1rem;
        background: transparent;
        color: #007aff;
        border: 1px solid #007aff;
        border-radius: 6px;
        cursor: pointer;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="math-worksheet-app">
        <div class="controls-panel">
          <h2>Math Worksheet Generator</h2>
          
          <div class="settings-group">
            <label for="operation">Operation</label>
            <select id="operation">
              <option value="addition">Addition</option>
              <option value="subtraction">Subtraction</option>
              <option value="multiplication">Multiplication</option>
              <option value="division">Division</option>
            </select>
          </div>
          
          <div class="settings-group">
            <label for="problemCount">Number of Problems</label>
            <input type="number" id="problemCount" value="15" min="10" max="25">
          </div>
          
          <div class="settings-group">
            <label for="minNumber">Minimum Number</label>
            <input type="number" id="minNumber" value="1" min="0" max="100">
          </div>
          
          <div class="settings-group">
            <label for="maxNumber">Maximum Number</label>
            <input type="number" id="maxNumber" value="10" min="1" max="100">
          </div>
          
          <button id="generateBtn" class="btn-primary">
            Generate Worksheet
          </button>
        </div>
        
        <div class="preview-panel">
          <div class="canvas-container">
            <canvas id="worksheetCanvas" width="612" height="792"></canvas>
          </div>
          
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadBtn">Download PDF</button>
            <button id="printBtn">Print</button>
          </div>
        </div>
      </div>
    `;
    
    this.initializeCanvas();
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
    if (!this.worksheetCanvas) return;

    const operation = this.shadowRoot.getElementById('operation').value;
    const problemCount = parseInt(this.shadowRoot.getElementById('problemCount').value);
    const minNumber = parseInt(this.shadowRoot.getElementById('minNumber').value);
    const maxNumber = parseInt(this.shadowRoot.getElementById('maxNumber').value);

    this.worksheetCanvas.clear();
    this.currentProblems = [];

    // Title
    const title = new fabric.Text(`${operation.charAt(0).toUpperCase() + operation.slice(1)} Worksheet`, {
      left: 306,
      top: 40,
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center'
    });
    this.worksheetCanvas.add(title);

    // Generate problems
    const cols = 3;
    const rows = Math.ceil(problemCount / cols);
    let currentProblem = 0;

    for (let row = 0; row < rows && currentProblem < problemCount; row++) {
      for (let col = 0; col < cols && currentProblem < problemCount; col++) {
        const x = 70 + col * 170;
        const y = 120 + row * 80;
        
        const problem = this.generateProblem(operation, minNumber, maxNumber);
        this.currentProblems.push(problem);
        
        await this.addProblemToCanvas(problem, x, y);
        currentProblem++;
      }
    }

    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    actionButtons.style.display = 'flex';
  }

  generateProblem(operation, min, max) {
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    let answer;
    let symbol;
    
    switch (operation) {
      case 'addition':
        answer = num1 + num2;
        symbol = '+';
        break;
      case 'subtraction':
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        symbol = '-';
        return { num1: Math.max(num1, num2), num2: Math.min(num1, num2), answer, symbol };
      case 'multiplication':
        answer = num1 * num2;
        symbol = '×';
        break;
      case 'division':
        const dividend = num1 * num2;
        answer = num1;
        symbol = '÷';
        return { num1: dividend, num2: num2, answer, symbol };
      default:
        answer = num1 + num2;
        symbol = '+';
    }
    
    return { num1, num2, answer, symbol };
  }

  async addProblemToCanvas(problem, x, y) {
    const num1Text = new fabric.Text(problem.num1.toString(), {
      left: x + 60,
      top: y,
      fontFamily: 'Arial',
      fontSize: 18,
      textAlign: 'right',
      originX: 'right'
    });
    
    const symbolText = new fabric.Text(problem.symbol, {
      left: x + 20,
      top: y + 25,
      fontFamily: 'Arial',
      fontSize: 18
    });
    
    const num2Text = new fabric.Text(problem.num2.toString(), {
      left: x + 60,
      top: y + 25,
      fontFamily: 'Arial',
      fontSize: 18,
      textAlign: 'right',
      originX: 'right'
    });
    
    const line = new fabric.Line([x + 10, y + 50, x + 70, y + 50], {
      stroke: '#000',
      strokeWidth: 1
    });
    
    this.worksheetCanvas.add(num1Text, symbolText, num2Text, line);
  }

  downloadWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'math-worksheet.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  printWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head><title>Math Worksheet</title></head>
      <body style="margin:0;">
        <img src="${this.worksheetCanvas.toDataURL()}" style="max-width:100%;height:auto;">
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => {
      try {
        canvas.dispose();
      } catch (e) {
        console.warn('Error disposing canvas:', e);
      }
    });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-math-worksheet', MathWorksheetGenerator);
export default MathWorksheetGenerator;