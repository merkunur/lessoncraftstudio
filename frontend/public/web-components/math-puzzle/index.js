import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class MathPuzzleGenerator extends BaseWebComponent {
  get appName() { return 'math-puzzle'; }
  getDefaultTranslations() { return { en: { mathPuzzle: { title: 'Math Puzzle', generateWorksheet: 'Generate Worksheet', download: 'Download' } } }; }
  getStyles() { return `:host { display: block; } .layout { display: flex; height: 80vh; } .panel { width: 340px; background: #2c2c2e; color: #e0e0e0; padding: 20px; } .main { flex: 1; background: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 20px; } canvas { border: 1px solid #ddd; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); } button { width: 100%; padding: 10px; margin: 5px 0; background: #007aff; color: white; border: none; border-radius: 5px; cursor: pointer; }`; }
  
  render() {
    this.shadowRoot.innerHTML = `<style>${this.getStyles()}</style><div class="layout"><div class="panel"><h2>Math Puzzle</h2><button id="generateBtn">Generate Worksheet</button><button id="downloadBtn">Download</button></div><div class="main"><canvas id="canvas" width="612" height="792"></canvas></div></div>`;
  }

  async generateWorksheet() {
    if (typeof fabric === 'undefined') await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    const canvas = this.shadowRoot.getElementById('canvas');
    this.canvas = new fabric.Canvas(canvas);
    this.canvas.add(new fabric.Text('Math Puzzle', { left: 306, top: 30, fontSize: 24, originX: 'center', fontWeight: 'bold' }));
    
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const problem = new fabric.Text(`${i + 1}. ${a} + ${b} = ___`, { left: 50, top: 80 + i * 40, fontSize: 16 });
      this.canvas.add(problem);
    }
    
    this.emit('worksheet-generated', { type: 'math-puzzle' });
  }

  loadScript(src) { return new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = reject; document.head.appendChild(script); }); }
  setupEventListeners() {
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateWorksheet());
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => { const link = document.createElement('a'); link.download = 'math-puzzle.png'; link.href = this.canvas.toDataURL(); link.click(); });
  }
}

customElements.define('lcs-math-puzzle', MathPuzzleGenerator);