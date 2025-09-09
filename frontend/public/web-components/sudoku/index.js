import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class SudokuGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
    this.currentSudoku = null;
  }

  get appName() { return 'sudoku'; }

  getDefaultTranslations() {
    return {
      en: { sudoku: { title: 'Sudoku Puzzle', difficulty: 'Difficulty Level', easy: 'Easy', medium: 'Medium', hard: 'Hard', gridSize: 'Grid Size', generate: 'Generate Sudoku' } }
    };
  }

  getStyles() {
    return `:host { display: block; font-family: sans-serif; } .sudoku-app { display: flex; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 1rem; } .controls-panel { width: 340px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; } .settings-group { margin-bottom: 1.5rem; } .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; } .settings-group select { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; } .btn-primary { width: 100%; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #007aff; color: white; } .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; } .canvas-container canvas { border: 1px solid #dce1e6; max-width: 100%; }`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="sudoku-app">
        <div class="controls-panel">
          <h2>Sudoku Puzzle</h2>
          <div class="settings-group">
            <label for="gridSize">Grid Size</label>
            <select id="gridSize">
              <option value="4">4x4 (Easy)</option>
              <option value="6">6x6 (Medium)</option>
              <option value="9">9x9 (Hard)</option>
            </select>
          </div>
          <div class="settings-group">
            <label for="difficulty">Difficulty Level</label>
            <select id="difficulty">
              <option value="easy">Easy (More clues)</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard (Fewer clues)</option>
            </select>
          </div>
          <button id="generateBtn" class="btn-primary">Generate Sudoku</button>
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
    this.initializeCanvas();
  }

  setupEventListeners() {
    this.shadowRoot.getElementById('generateBtn')?.addEventListener('click', () => this.generateSudoku());
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

  generateSudoku() {
    if (!this.worksheetCanvas) return;
    this.worksheetCanvas.clear();
    
    const title = new fabric.Text('Sudoku Puzzle', { left: 306, top: 40, fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', textAlign: 'center', originX: 'center' });
    this.worksheetCanvas.add(title);

    const gridSize = parseInt(this.shadowRoot.getElementById('gridSize').value) || 4;
    const difficulty = this.shadowRoot.getElementById('difficulty').value;
    
    // Generate and display sudoku grid
    this.currentSudoku = this.generateSudokuGrid(gridSize);
    this.displaySudokuGrid(this.currentSudoku, gridSize, difficulty);

    this.shadowRoot.getElementById('actionButtons').style.display = 'block';
  }

  generateSudokuGrid(size) {
    // Simplified sudoku generation - create a valid completed grid
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = (i * size + i + j) % size + 1;
      }
    }
    return grid;
  }

  displaySudokuGrid(grid, size, difficulty) {
    const cellSize = 360 / size;
    const startX = 126;
    const startY = 120;
    const boxSize = Math.sqrt(size);
    
    // Draw grid lines
    for (let i = 0; i <= size; i++) {
      const thickness = (i % boxSize === 0) ? 3 : 1;
      // Horizontal lines
      const hLine = new fabric.Line([startX, startY + i * cellSize, startX + size * cellSize, startY + i * cellSize], { stroke: '#000', strokeWidth: thickness });
      // Vertical lines
      const vLine = new fabric.Line([startX + i * cellSize, startY, startX + i * cellSize, startY + size * cellSize], { stroke: '#000', strokeWidth: thickness });
      this.worksheetCanvas.add(hLine, vLine);
    }

    // Fill in numbers based on difficulty
    const cluePercentage = { easy: 0.6, medium: 0.4, hard: 0.3 }[difficulty] || 0.5;
    const totalCells = size * size;
    const cluesToShow = Math.floor(totalCells * cluePercentage);
    
    const cellsToFill = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cellsToFill.push({ row: i, col: j });
      }
    }
    
    // Randomly select cells to show
    for (let i = 0; i < cluesToShow; i++) {
      const randomIndex = Math.floor(Math.random() * cellsToFill.length);
      const cell = cellsToFill.splice(randomIndex, 1)[0];
      
      const number = new fabric.Text(grid[cell.row][cell.col].toString(), {
        left: startX + cell.col * cellSize + cellSize/2,
        top: startY + cell.row * cellSize + cellSize/2,
        fontFamily: 'Arial',
        fontSize: cellSize * 0.6,
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        fill: '#000'
      });
      this.worksheetCanvas.add(number);
    }

    // Add instructions
    const instructions = new fabric.Text(`Fill in the missing numbers (1-${size}):`, {
      left: 306,
      top: 80,
      fontFamily: 'Arial',
      fontSize: 14,
      textAlign: 'center',
      originX: 'center',
      fill: '#666'
    });
    this.worksheetCanvas.add(instructions);
  }

  downloadWorksheet() {
    if (!this.worksheetCanvas) return;
    const link = document.createElement('a');
    link.download = 'sudoku-puzzle.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => { try { canvas.dispose(); } catch (e) {} });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-sudoku', SudokuGenerator);
export default SudokuGenerator;