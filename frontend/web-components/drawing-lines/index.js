import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class DrawingLinesGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.worksheetCanvas = null;
    this.fabricInstances = new Set();
  }

  get appName() { return 'drawing-lines'; }

  getDefaultTranslations() {
    return {
      en: { drawingLines: { title: 'Drawing Lines Worksheet', lineType: 'Line Type', straight: 'Straight Lines', curved: 'Curved Lines', zigzag: 'Zigzag Lines', generate: 'Generate Worksheet' } }
    };
  }

  getStyles() {
    return `:host { display: block; font-family: sans-serif; } .drawing-lines-app { display: flex; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 1rem; } .controls-panel { width: 340px; background: #2c2c2e; color: #e0e0e0; border-radius: 12px; padding: 1.5rem; } .settings-group { margin-bottom: 1.5rem; } .settings-group label { display: block; margin-bottom: 0.5rem; color: #a0a0a0; } .settings-group select { width: 100%; padding: 0.75rem; border: 1px solid #4a4a4a; background: #3a3a3e; color: #e0e0e0; border-radius: 6px; } .btn-primary { width: 100%; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #007aff; color: white; } .preview-panel { flex: 1; background: white; border-radius: 12px; padding: 1.5rem; } .canvas-container canvas { border: 1px solid #dce1e6; max-width: 100%; }`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="drawing-lines-app">
        <div class="controls-panel">
          <h2>Drawing Lines Worksheet</h2>
          <div class="settings-group">
            <label for="lineType">Line Type</label>
            <select id="lineType">
              <option value="straight">Straight Lines</option>
              <option value="curved">Curved Lines</option>
              <option value="zigzag">Zigzag Lines</option>
            </select>
          </div>
          <button id="generateBtn" class="btn-primary">Generate Worksheet</button>
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

  generateWorksheet() {
    if (!this.worksheetCanvas) return;
    this.worksheetCanvas.clear();
    
    const title = new fabric.Text('Practice Drawing Lines', { left: 306, top: 40, fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', textAlign: 'center', originX: 'center' });
    this.worksheetCanvas.add(title);

    const lineType = this.shadowRoot.getElementById('lineType').value;
    
    for (let i = 0; i < 8; i++) {
      const y = 120 + i * 80;
      this.addLineExercise(lineType, y);
    }

    this.shadowRoot.getElementById('actionButtons').style.display = 'block';
  }

  addLineExercise(lineType, y) {
    const startX = 80;
    const endX = 520;
    
    if (lineType === 'straight') {
      const line = new fabric.Line([startX, y, endX, y], { stroke: '#ccc', strokeWidth: 1, strokeDashArray: [5, 5] });
      this.worksheetCanvas.add(line);
    } else if (lineType === 'curved') {
      const path = new fabric.Path(`M ${startX} ${y} Q ${startX + 220} ${y - 30} ${endX} ${y}`, { stroke: '#ccc', strokeWidth: 1, fill: '', strokeDashArray: [5, 5] });
      this.worksheetCanvas.add(path);
    } else if (lineType === 'zigzag') {
      let pathData = `M ${startX} ${y}`;
      for (let x = startX + 40; x < endX; x += 40) {
        const yOffset = ((x - startX) / 40) % 2 === 0 ? -20 : 20;
        pathData += ` L ${x} ${y + yOffset}`;
      }
      const path = new fabric.Path(pathData, { stroke: '#ccc', strokeWidth: 1, fill: '', strokeDashArray: [5, 5] });
      this.worksheetCanvas.add(path);
    }
  }

  downloadWorksheet() {
    if (!this.worksheetCanvas) return;
    const link = document.createElement('a');
    link.download = 'drawing-lines-worksheet.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
  }

  cleanup() {
    this.fabricInstances.forEach(canvas => { try { canvas.dispose(); } catch (e) {} });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-drawing-lines', DrawingLinesGenerator);
export default DrawingLinesGenerator;