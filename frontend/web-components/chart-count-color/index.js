import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class ChartCountColorGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.uploadedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
    this.currentChart = null;
  }

  get appName() {
    return 'chart-count-color';
  }

  getDefaultTranslations() {
    return {
      en: {
        chartCountColor: {
          title: 'Picture Graph Playground',
          pageSetup: 'Page Setup',
          pageSize: 'Page Size',
          pageColor: 'Page Color',
          includeNameDate: 'Include Name/Date Fields',
          background: 'Background',
          backgroundTheme: 'Background Theme',
          backgroundOpacity: 'Background Opacity',
          border: 'Border',
          borderTheme: 'Border Theme',
          borderOpacity: 'Border Opacity',
          textTools: 'Text Tools',
          addNewText: 'Add New Text',
          content: 'Content',
          addText: 'Add Text',
          selectedTextProps: 'Selected Text Properties',
          color: 'Color',
          size: 'Size',
          font: 'Font',
          outlineColor: 'Outline Color',
          outline: 'Outline (0-10)',
          imageLibrary: 'Image Library',
          worksheetImageSource: 'Worksheet Image Source',
          manualSelection: 'Manual Selection Below',
          imageBrowserTheme: 'Image Browser Theme',
          searchImages: 'Search Images',
          manuallySelected: 'Manually Selected: {count} / 6',
          availableImages: 'Available Images (Click to add)',
          selectedImages: 'Selected Images (Click to remove)',
          uploadCustom: 'Upload Custom Images',
          selectFiles: 'Select image(s) to upload',
          uploadedImages: 'Your Uploaded Images (This Session)',
          generate: 'Generate',
          generateWorksheet: 'Generate Worksheet',
          generateAnswerKey: 'Generate Answer Key',
          download: 'Download',
          worksheetJpeg: 'Worksheet (JPEG)',
          answerKeyJpeg: 'Answer Key (JPEG)',
          worksheetPdf: 'Worksheet (PDF)',
          answerKeyPdf: 'Answer Key (PDF)',
          grayscale: 'Grayscale',
          clearAll: 'Clear All',
          worksheet: 'Worksheet',
          answerKey: 'Answer Key',
          generating: 'Generating picture graph...',
          noImagesError: 'Please select at least 3 images to create a chart',
          selectTheme: 'Please select a theme or manually choose images'
        },
        common: {
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        --app-bg-dark: #2c2c2e;
        --app-surface-dark: #3a3a3e;
        --app-border-dark: #4a4a4a;
        --app-text-primary-dark-theme: #e0e0e0;
        --app-text-secondary-dark-theme: #a0a0a0;
        --app-bg-light: #f0f2f5;
        --app-surface-light: #ffffff;
        --app-border-light: #dce1e6;
        --app-text-primary-light-theme: #1c1c1e;
        --app-text-secondary-light-theme: #545458;
        --app-accent-primary: #007aff;
        --app-accent-primary-hover: #005ecb;
        --app-accent-danger: #ff3b30;
        --sidebar-width: 340px;
      }

      .layout {
        display: flex;
        height: 80vh;
        min-height: 600px;
        position: relative;
      }

      .panel {
        width: var(--sidebar-width);
        min-width: var(--sidebar-width);
        background-color: var(--app-bg-dark);
        color: var(--app-text-primary-dark-theme);
        box-shadow: 2px 0 8px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        z-index: 10;
      }

      .panel-header {
        padding: 20px 25px;
        border-bottom: 1px solid var(--app-border-dark);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-header h2 {
        font-family: 'Fredoka', sans-serif;
        font-weight: 600;
        font-size: 22px;
        color: var(--app-text-primary-dark-theme);
        margin: 0;
      }

      .panel-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: 0;
      }

      .panel-footer {
        padding: 15px 25px;
        border-top: 1px solid var(--app-border-dark);
        margin-top: auto;
        background-color: var(--app-bg-dark);
      }

      .accordion-item {
        border-bottom: 1px solid var(--app-border-dark);
      }

      .accordion-item:last-of-type {
        border-bottom: none;
      }

      .accordion-button {
        background-color: transparent;
        color: var(--app-text-primary-dark-theme);
        width: 100%;
        border: none;
        text-align: left;
        padding: 18px 20px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.15s ease;
      }

      .accordion-button:hover {
        background-color: rgba(255,255,255,0.05);
      }

      .accordion-button::after {
        content: '▼';
        font-size: 12px;
        transition: transform 0.2s ease-in-out;
      }

      .accordion-button.active::after {
        transform: rotate(-180deg);
      }

      .accordion-content {
        padding: 10px 15px 20px 15px;
        display: none;
        background: transparent;
      }

      .accordion-content.active {
        display: block;
      }

      .accordion-content label {
        display: block;
        font-size: 13px;
        font-weight: 400;
        color: var(--app-text-secondary-dark-theme);
        margin-bottom: 6px;
      }

      .accordion-content input[type="text"],
      .accordion-content input[type="number"],
      .accordion-content textarea,
      .accordion-content select {
        width: 100%;
        padding: 8px 10px;
        font-size: 13px;
        border-radius: 5px;
        border: 1px solid var(--app-border-dark);
        background-color: var(--app-surface-dark);
        color: var(--app-text-primary-dark-theme);
        box-sizing: border-box;
        margin-bottom: 12px;
      }

      .accordion-content input[type="file"],
      .accordion-content input[type="color"] {
        width: 100%;
        margin-bottom: 12px;
        padding: 2px;
        height: 38px;
        border-radius: 5px;
        border-color: var(--app-border-dark);
      }

      .accordion-content input[type="range"] {
        width: 100%;
        padding: 0;
        margin-bottom: 12px;
      }

      .accordion-content input[type="checkbox"] {
        width: auto;
        margin-right: 8px;
        vertical-align: middle;
        accent-color: var(--app-accent-primary);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        font-size: 13px;
        font-weight: 400;
        margin-bottom: 12px;
        cursor: pointer;
        color: var(--app-text-secondary-dark-theme);
      }

      .accordion-content button {
        background-color: var(--app-surface-dark);
        color: var(--app-text-primary-dark-theme);
        border: 1px solid var(--app-border-dark);
        font-weight: 500;
        width: 100%;
        padding: 8px 12px;
        font-size: 13px;
        border-radius: 5px;
        margin-bottom: 10px;
        cursor: pointer;
      }

      .accordion-content button:hover {
        background-color: rgba(255,255,255,0.1);
      }

      .accordion-content h4 {
        font-size: 13px;
        color: var(--app-text-secondary-dark-theme);
        margin-top: 15px;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--app-border-dark);
        padding-bottom: 6px;
        font-weight: 500;
      }

      .accordion-content h4:first-child {
        margin-top: 0;
      }

      .main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        background-color: var(--app-bg-light);
        padding: 0;
      }

      .top-right-actions {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 20;
      }

      .dropdown-container {
        position: relative;
      }

      .action-button {
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid var(--app-border-light);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s ease;
      }

      .action-button.accent {
        background-color: var(--app-accent-primary);
        color: white;
        border-color: var(--app-accent-primary);
      }

      .action-button.accent:hover {
        background-color: var(--app-accent-primary-hover);
      }

      .action-button.secondary {
        background-color: var(--app-surface-light);
        color: var(--app-text-primary-light-theme);
      }

      .action-button.secondary:hover {
        background-color: #f8f9fa;
      }

      .action-button.danger {
        background-color: var(--app-accent-danger);
        color: white;
        border-color: var(--app-accent-danger);
      }

      .action-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        top: calc(100% + 5px);
        right: 0;
        background-color: var(--app-surface-light);
        min-width: 200px;
        box-shadow: 0px 5px 15px rgba(0,0,0,0.15);
        border: 1px solid var(--app-border-light);
        border-radius: 6px;
        padding: 8px;
        z-index: 101;
      }

      .dropdown-content.show {
        display: block;
      }

      .dropdown-content button {
        width: 100%;
        padding: 8px 12px;
        font-size: 13px;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 6px;
        background-color: transparent;
        color: var(--app-text-primary-light-theme);
        border: none;
        cursor: pointer;
        text-align: left;
        font-weight: 400;
        transition: background-color 0.15s ease;
      }

      .dropdown-content button:last-of-type {
        margin-bottom: 0;
      }

      .dropdown-content button:hover {
        background-color: rgba(0,0,0,0.05);
      }

      .tab-row {
        display: flex;
        border-bottom: 1px solid var(--app-border-light);
        background-color: var(--app-surface-light);
        padding: 0 20px;
      }

      .tab-button {
        padding: 12px 24px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: var(--app-text-secondary-light-theme);
        border-bottom: 2px solid transparent;
        transition: all 0.2s ease;
      }

      .tab-button.active {
        color: var(--app-accent-primary);
        border-bottom-color: var(--app-accent-primary);
      }

      .tab-content-wrapper {
        flex: 1;
        position: relative;
        overflow: hidden;
      }

      .tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: none;
        overflow: auto;
      }

      .tab.active {
        display: block;
      }

      .canvas-container-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100%;
        padding: 20px;
      }

      .canvas-container-wrapper canvas {
        border: 1px solid var(--app-border-light);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        background-color: white;
        max-width: 100%;
        height: auto;
      }

      .dictionary-item {
        padding: 8px;
        cursor: pointer;
        border: 1px solid transparent;
        font-size: 13px;
        transition: background-color 0.15s ease, border-color 0.15s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        background-color: rgba(255,255,255,0.05);
      }

      .dictionary-item:hover {
        background-color: rgba(255,255,255,0.1);
        border-color: var(--app-accent-primary);
      }

      .dictionary-item.selected {
        border-color: var(--app-accent-primary);
        background-color: rgba(0, 122, 255, 0.15);
      }

      .dictionary-item img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        border: 1px solid var(--app-border-dark);
        border-radius: 3px;
        background-color: var(--app-surface-light);
        margin-bottom: 5px;
      }

      .dictionary-item span {
        font-size: 10px;
        text-align: center;
        word-break: break-word;
        max-width: 50px;
        color: var(--app-text-secondary-dark-theme);
      }

      #dictionary, #selectedImagesPreview, #uploadedImagesPreview {
        border: 1px solid var(--app-border-dark);
        padding: 10px;
        max-height: 180px;
        overflow-y: auto;
        background-color: var(--app-surface-dark);
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      #selectedImagesPreview {
        min-height: 70px;
        border-style: dashed;
        border-color: var(--app-accent-primary);
      }

      .dictionary-message {
        width: 100%;
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: var(--app-text-secondary-dark-theme);
        margin: 0;
        align-self: center;
      }

      .selected-count {
        font-size: 12px;
        text-align: center;
        color: var(--app-text-secondary-dark-theme);
        margin-bottom: 10px;
      }

      #message {
        font-size: 12px;
        color: var(--app-text-secondary-dark-theme);
        text-align: center;
      }

      .loading {
        text-align: center;
        padding: 20px;
        color: var(--app-text-secondary-light-theme);
      }

      .error {
        color: var(--app-accent-danger);
        text-align: center;
        padding: 10px;
        background-color: rgba(255, 59, 48, 0.1);
        border-radius: 5px;
        margin: 10px 0;
      }

      .success {
        color: #10B981;
        text-align: center;
        padding: 10px;
        background-color: rgba(16, 185, 129, 0.1);
        border-radius: 5px;
        margin: 10px 0;
      }

      @media (max-width: 768px) {
        .layout {
          flex-direction: column;
        }
        
        .panel {
          width: 100%;
          height: 300px;
        }
        
        .main {
          flex: 1;
        }

        .top-right-actions {
          position: relative;
          top: 0;
          right: 0;
          padding: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="layout">
        <div class="panel">
          <div class="panel-header">
            <h2 data-i18n="chartCountColor.title">Picture Graph Playground</h2>
          </div>
          <div class="panel-content">
            
            <!-- Page Setup -->
            <div class="accordion-item">
              <button class="accordion-button active" data-section="pageSetup">
                <span data-i18n="chartCountColor.pageSetup">Page Setup</span>
              </button>
              <div class="accordion-content active">
                <label for="pageSizeSelect" data-i18n="chartCountColor.pageSize">Page Size:</label>
                <select id="pageSizeSelect">
                  <option value="792x612" selected>Letter Landscape (792x612)</option>
                  <option value="800x1000">Default Portrait (800x1000)</option>
                  <option value="1000x800">Default Landscape (1000x800)</option>
                  <option value="595x842">A4 Portrait (595x842)</option>
                  <option value="842x595">A4 Landscape (842x595)</option>
                  <option value="612x792">Letter Portrait (612x792)</option>
                  <option value="1200x1200">Square (1200x1200)</option>
                  <option value="custom">Custom</option>
                </select>
                
                <div id="customPageSizeInputs" style="display:none;">
                  <label for="pageWidth">Width (px):</label>
                  <input type="number" id="pageWidth" value="792">
                  <label for="pageHeight">Height (px):</label>
                  <input type="number" id="pageHeight" value="612">
                </div>
                
                <button id="setPageSizeBtn">Apply Size</button>
                
                <label for="pageColor" data-i18n="chartCountColor.pageColor">Page Color:</label>
                <input type="color" id="pageColor" value="#FFFFFF">
                
                <label for="includeNameDate" class="checkbox-label" style="margin-top: 15px;">
                  <input type="checkbox" id="includeNameDate">
                  <span data-i18n="chartCountColor.includeNameDate">Include Name/Date Fields</span>
                </label>
                
                <h4 data-i18n="chartCountColor.background">Background</h4>
                <label for="backgroundThemeSelect" data-i18n="chartCountColor.backgroundTheme">Background Theme:</label>
                <select id="backgroundThemeSelect">
                  <option value="none">None</option>
                </select>
                <div id="backgroundDictionary">
                  <p class="dictionary-message">Select a theme to see backgrounds.</p>
                </div>
                <label for="backgroundOpacity" data-i18n="chartCountColor.backgroundOpacity">Background Opacity:</label>
                <input type="range" id="backgroundOpacity" min="0" max="1" value="1" step="0.05">

                <h4 data-i18n="chartCountColor.border">Border</h4>
                <label for="borderThemeSelect" data-i18n="chartCountColor.borderTheme">Border Theme:</label>
                <select id="borderThemeSelect">
                  <option value="none">None</option>
                </select>
                <div id="borderDictionary">
                  <p class="dictionary-message">Select a theme to see borders.</p>
                </div>
                <label for="borderOpacity" data-i18n="chartCountColor.borderOpacity">Border Opacity:</label>
                <input type="range" id="borderOpacity" min="0" max="1" value="1" step="0.05">
              </div>
            </div>

            <!-- Text Tools -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="textTools">
                <span data-i18n="chartCountColor.textTools">Text Tools</span>
              </button>
              <div class="accordion-content">
                <h4 data-i18n="chartCountColor.addNewText">Add New Text</h4>
                <label for="textInput" data-i18n="chartCountColor.content">Content:</label>
                <input type="text" id="textInput" placeholder="Hello!">
                <button id="addTextBtn" data-i18n="chartCountColor.addText">Add Text</button>
                
                <h4 data-i18n="chartCountColor.selectedTextProps">Selected Text Properties</h4>
                <label for="textColor" data-i18n="chartCountColor.color">Color:</label>
                <input type="color" id="textColor" value="#333333" disabled>
                
                <label for="fontSize" data-i18n="chartCountColor.size">Size:</label>
                <input type="number" id="fontSize" value="48" min="8" disabled>
                
                <label for="fontFamily" data-i18n="chartCountColor.font">Font:</label>
                <select id="fontFamily" disabled>
                  <option value="Lexend Deca">Lexend Deca</option>
                  <option value="Baloo 2">Baloo 2</option>
                  <option value="Nunito">Nunito</option>
                  <option value="Quicksand">Quicksand</option>
                  <option value="Fredoka">Fredoka</option>
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                </select>
                
                <label for="textStrokeColor" data-i18n="chartCountColor.outlineColor">Outline Color:</label>
                <input type="color" id="textStrokeColor" value="#000000" disabled>
                
                <label for="textStrokeWidth" data-i18n="chartCountColor.outline">Outline (0-10):</label>
                <input type="range" id="textStrokeWidth" min="0" max="10" value="0" step="0.5" disabled>
              </div>
            </div>

            <!-- Image Library -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="imageLibrary">
                <span data-i18n="chartCountColor.imageLibrary">Image Library</span>
              </button>
              <div class="accordion-content">
                <label for="worksheetThemeSelect" data-i18n="chartCountColor.worksheetImageSource">Worksheet Image Source:</label>
                <select id="worksheetThemeSelect">
                  <option value="" data-i18n="chartCountColor.manualSelection">Manual Selection Below</option>
                </select>
                
                <h4 data-i18n="chartCountColor.manualSelection">Manual Image Selection & Browse</h4>
                <label for="themeSelect" data-i18n="chartCountColor.imageBrowserTheme">Image Browser Theme:</label>
                <select id="themeSelect"></select>
                
                <label for="searchInput" data-i18n="chartCountColor.searchImages">Search Images:</label>
                <input type="text" id="searchInput" placeholder="e.g., apple, car">
                
                <p class="selected-count" data-i18n="chartCountColor.manuallySelected">Manually Selected: <span id="selectedCount">0</span> / 6</p>
                
                <label data-i18n="chartCountColor.availableImages">Available Images (Click to add):</label>
                <div id="dictionary">
                  <p class="dictionary-message">Loading images...</p>
                </div>
                
                <label data-i18n="chartCountColor.selectedImages">Selected Images (Click to remove):</label>
                <div id="selectedImagesPreview"></div>
              </div>
            </div>

            <!-- Upload Custom Images -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="uploadCustom">
                <span data-i18n="chartCountColor.uploadCustom">Upload Custom Images</span>
              </button>
              <div class="accordion-content">
                <label for="imageUploadInput" data-i18n="chartCountColor.selectFiles">Select image(s) to upload:</label>
                <input type="file" id="imageUploadInput" multiple accept="image/*">
                
                <label data-i18n="chartCountColor.uploadedImages">Your Uploaded Images (This Session):</label>
                <div id="uploadedImagesPreview">
                  <p class="dictionary-message">Your uploaded images will appear here.</p>
                </div>
              </div>
            </div>

          </div>
          <div class="panel-footer">
            <div id="message"></div>
          </div>
        </div>

        <div class="main">
          <div class="top-right-actions">
            <div class="dropdown-container">
              <button id="generateDropdownBtn" class="action-button accent">
                <span data-i18n="chartCountColor.generate">Generate</span>
                <span>▼</span>
              </button>
              <div id="generateDropdownContent" class="dropdown-content">
                <button id="generateWorksheetBtn" data-i18n="chartCountColor.generateWorksheet">Generate Worksheet</button>
                <button id="generateSolutionBtn" data-i18n="chartCountColor.generateAnswerKey" disabled>Generate Answer Key</button>
              </div>
            </div>
            
            <div class="dropdown-container">
              <button id="downloadDropdownBtn" class="action-button secondary" disabled>
                <span data-i18n="chartCountColor.download">Download</span>
                <span>▼</span>
              </button>
              <div id="downloadDropdownContent" class="dropdown-content">
                <button id="downloadWsJpegBtn" data-i18n="chartCountColor.worksheetJpeg" disabled>Worksheet (JPEG)</button>
                <button id="downloadAkJpegBtn" data-i18n="chartCountColor.answerKeyJpeg" disabled>Answer Key (JPEG)</button>
                <button id="downloadWsPdfBtn" data-i18n="chartCountColor.worksheetPdf" disabled>Worksheet (PDF)</button>
                <button id="downloadAkPdfBtn" data-i18n="chartCountColor.answerKeyPdf" disabled>Answer Key (PDF)</button>
                <label class="checkbox-label">
                  <input type="checkbox" id="grayscaleToggle">
                  <span data-i18n="chartCountColor.grayscale">Grayscale</span>
                </label>
              </div>
            </div>
            
            <button id="clearBtn" class="action-button danger">
              <span data-i18n="chartCountColor.clearAll">Clear All</span>
            </button>
          </div>

          <div class="tab-row">
            <button class="tab-button active" data-tab="worksheetTab">
              <span data-i18n="chartCountColor.worksheet">Worksheet</span>
            </button>
            <button class="tab-button" data-tab="solutionTab">
              <span data-i18n="chartCountColor.answerKey">Answer Key</span>
            </button>
          </div>

          <div class="tab-content-wrapper">
            <div class="tab active" id="worksheetTab">
              <div class="canvas-container-wrapper">
                <canvas id="worksheetCanvas"></canvas>
              </div>
            </div>
            <div class="tab" id="solutionTab">
              <div class="canvas-container-wrapper">
                <canvas id="solutionCanvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.updateUIText();
    this.initializeCanvases();
    this.loadImageLibrary();
  }

  async initializeCanvases() {
    // Load Fabric.js dynamically
    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    const worksheetCanvas = this.shadowRoot.getElementById('worksheetCanvas');
    const solutionCanvas = this.shadowRoot.getElementById('solutionCanvas');

    if (worksheetCanvas && solutionCanvas) {
      this.worksheetCanvas = new fabric.Canvas(worksheetCanvas, {
        width: 792,
        height: 612,
        backgroundColor: '#ffffff'
      });

      this.answerKeyCanvas = new fabric.Canvas(solutionCanvas, {
        width: 792,
        height: 612,
        backgroundColor: '#ffffff'
      });

      this.fabricInstances.add(this.worksheetCanvas);
      this.fabricInstances.add(this.answerKeyCanvas);
    }
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

  async loadImageLibrary() {
    if (!this._images || this._images.length === 0) {
      this.showDictionaryMessage('No images available. Please configure the image library.');
      return;
    }

    const dictionary = this.shadowRoot.getElementById('dictionary');
    dictionary.innerHTML = '';

    // Group images by theme for theme selectors
    const themes = [...new Set(this._images.map(img => img.theme).filter(Boolean))];
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    const worksheetThemeSelect = this.shadowRoot.getElementById('worksheetThemeSelect');
    
    themeSelect.innerHTML = '<option value="">All Themes</option>';
    worksheetThemeSelect.innerHTML = '<option value="">Manual Selection Below</option>';
    
    themes.forEach(theme => {
      themeSelect.innerHTML += `<option value="${theme}">${theme}</option>`;
      worksheetThemeSelect.innerHTML += `<option value="${theme}">${theme}</option>`;
    });

    this.displayImages(this._images);
  }

  displayImages(images) {
    const dictionary = this.shadowRoot.getElementById('dictionary');
    dictionary.innerHTML = '';

    if (images.length === 0) {
      this.showDictionaryMessage('No images found for selected criteria.');
      return;
    }

    images.forEach(image => {
      const item = document.createElement('div');
      item.className = 'dictionary-item';
      item.innerHTML = `
        <img src="${image.url}" alt="${image.displayName}">
        <span>${image.displayName}</span>
      `;
      item.addEventListener('click', () => this.toggleImageSelection(image, item));
      dictionary.appendChild(item);
    });
  }

  showDictionaryMessage(message) {
    const dictionary = this.shadowRoot.getElementById('dictionary');
    dictionary.innerHTML = `<p class="dictionary-message">${message}</p>`;
  }

  toggleImageSelection(image, element) {
    if (this.selectedImages.length >= 6 && !element.classList.contains('selected')) {
      this.showMessage('Maximum 6 images can be selected for the chart.', 'error');
      return;
    }

    const index = this.selectedImages.findIndex(img => img.fileKey === image.fileKey);
    
    if (index === -1) {
      this.selectedImages.push(image);
      element.classList.add('selected');
    } else {
      this.selectedImages.splice(index, 1);
      element.classList.remove('selected');
    }

    this.updateSelectedImagesPreview();
    this.updateSelectedCount();
  }

  updateSelectedImagesPreview() {
    const preview = this.shadowRoot.getElementById('selectedImagesPreview');
    preview.innerHTML = '';

    if (this.selectedImages.length === 0) {
      preview.innerHTML = '<p class="dictionary-message">No images selected</p>';
      return;
    }

    this.selectedImages.forEach((image, index) => {
      const item = document.createElement('div');
      item.className = 'dictionary-item selected';
      item.innerHTML = `
        <img src="${image.url}" alt="${image.displayName}">
        <span>${image.displayName}</span>
      `;
      item.addEventListener('click', () => this.removeSelectedImage(index));
      preview.appendChild(item);
    });
  }

  removeSelectedImage(index) {
    this.selectedImages.splice(index, 1);
    this.updateSelectedImagesPreview();
    this.updateSelectedCount();
    
    // Update dictionary display
    const dictionary = this.shadowRoot.getElementById('dictionary');
    const items = dictionary.querySelectorAll('.dictionary-item');
    items.forEach(item => {
      const img = item.querySelector('img');
      const isSelected = this.selectedImages.some(selected => selected.url === img.src);
      item.classList.toggle('selected', isSelected);
    });
  }

  updateSelectedCount() {
    const selectedCount = this.shadowRoot.getElementById('selectedCount');
    selectedCount.textContent = this.selectedImages.length;
  }

  async generateWorksheet() {
    const worksheetTheme = this.shadowRoot.getElementById('worksheetThemeSelect').value;
    
    // Determine images to use
    let imagesToUse = [];
    if (worksheetTheme) {
      // Use theme-based images
      const themeImages = this._images.filter(img => img.theme === worksheetTheme);
      imagesToUse = this.getRandomItems(themeImages, 6);
    } else if (this.selectedImages.length >= 3) {
      // Use manually selected images
      imagesToUse = this.selectedImages;
    } else {
      this.showMessage(this.getTranslation('chartCountColor.noImagesError'), 'error');
      return;
    }

    if (imagesToUse.length < 3) {
      this.showMessage(this.getTranslation('chartCountColor.noImagesError'), 'error');
      return;
    }

    this.showMessage(this.getTranslation('chartCountColor.generating'));
    
    try {
      // Clear canvases
      this.worksheetCanvas.clear();
      this.answerKeyCanvas.clear();
      
      // Apply page settings
      this.applyPageSettings();
      
      // Add name/date fields if enabled
      if (this.shadowRoot.getElementById('includeNameDate').checked) {
        this.addNameDateFields();
      }
      
      // Generate chart
      await this.generatePictureChart(imagesToUse);
      
      // Enable answer key and download buttons
      this.shadowRoot.getElementById('generateSolutionBtn').disabled = false;
      this.shadowRoot.getElementById('downloadDropdownBtn').disabled = false;
      this.enableDownloadButtons(true);
      
      this.showMessage('Picture graph generated successfully!', 'success');
      
      // Emit worksheet generated event
      this.emit('worksheet-generated', {
        type: 'chart-count-color',
        images: imagesToUse.map(img => img.displayName),
        chartData: this.currentChart
      });
      
    } catch (error) {
      console.error('Error generating worksheet:', error);
      this.showMessage('Error generating worksheet. Please try again.', 'error');
    }
  }

  getRandomItems(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, array.length));
  }

  applyPageSettings() {
    const pageSizeSelect = this.shadowRoot.getElementById('pageSizeSelect');
    const pageColor = this.shadowRoot.getElementById('pageColor').value;
    
    let width, height;
    if (pageSizeSelect.value === 'custom') {
      width = parseInt(this.shadowRoot.getElementById('pageWidth').value) || 792;
      height = parseInt(this.shadowRoot.getElementById('pageHeight').value) || 612;
    } else {
      [width, height] = pageSizeSelect.value.split('x').map(Number);
    }

    this.worksheetCanvas.setDimensions({ width, height });
    this.answerKeyCanvas.setDimensions({ width, height });
    
    this.worksheetCanvas.backgroundColor = pageColor;
    this.answerKeyCanvas.backgroundColor = pageColor;
  }

  addNameDateFields() {
    const nameText = new fabric.Text('Name: ________________________', {
      left: 50,
      top: 30,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#000000'
    });

    const dateText = new fabric.Text('Date: ________________________', {
      left: this.worksheetCanvas.width - 300,
      top: 30,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#000000'
    });

    this.worksheetCanvas.add(nameText, dateText);
    this.answerKeyCanvas.add(nameText.clone(), dateText.clone());
  }

  async generatePictureChart(images) {
    // Generate random quantities for each image (1-10)
    this.currentChart = {
      images: [],
      questions: []
    };

    const startY = this.shadowRoot.getElementById('includeNameDate').checked ? 80 : 50;
    const chartHeight = this.worksheetCanvas.height - startY - 100;
    const imageSize = 40;
    const spacing = 50;
    const maxRows = Math.floor(chartHeight / spacing);
    
    // Create chart grid
    const gridStartX = 100;
    const gridStartY = startY + 50;
    
    // Add chart title
    const title = new fabric.Text('Picture Graph - Count and Color', {
      left: this.worksheetCanvas.width / 2,
      top: startY,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
      originX: 'center',
      fontWeight: 'bold'
    });
    
    this.worksheetCanvas.add(title);
    this.answerKeyCanvas.add(title.clone());

    // Create chart for each image
    for (let i = 0; i < Math.min(images.length, 6); i++) {
      const image = images[i];
      const quantity = Math.floor(Math.random() * 8) + 2; // 2-9 items
      const column = i;
      const columnX = gridStartX + column * (imageSize + 30);

      // Add image label at bottom
      const labelY = gridStartY + maxRows * spacing + 20;
      
      try {
        // Add sample image at bottom as label
        const fabricImage = await this.createFabricImage(image.url, imageSize * 0.8, columnX, labelY);
        this.worksheetCanvas.add(fabricImage);
        this.answerKeyCanvas.add(fabricImage.clone());

        // Create empty squares on worksheet for coloring
        for (let row = 0; row < maxRows; row++) {
          const squareY = gridStartY + (maxRows - 1 - row) * spacing;
          
          const square = new fabric.Rect({
            left: columnX,
            top: squareY,
            width: imageSize,
            height: imageSize,
            fill: 'transparent',
            stroke: '#cccccc',
            strokeWidth: 2,
            selectable: false
          });
          
          this.worksheetCanvas.add(square);
          
          // On answer key, fill the squares and add images
          if (row < quantity) {
            const answerSquare = square.clone();
            answerSquare.set({
              fill: this.getRandomColor(),
              stroke: '#666666'
            });
            this.answerKeyCanvas.add(answerSquare);

            // Add small image in answer key
            try {
              const smallImage = await this.createFabricImage(
                image.url, 
                imageSize * 0.6, 
                columnX + imageSize * 0.2, 
                squareY + imageSize * 0.2
              );
              this.answerKeyCanvas.add(smallImage);
            } catch (err) {
              console.error('Error creating small image:', err);
            }
          } else {
            // Empty square in answer key
            this.answerKeyCanvas.add(square.clone());
          }
        }

        // Store chart data
        this.currentChart.images.push({
          image: image,
          quantity: quantity,
          column: i
        });

      } catch (error) {
        console.error('Error creating image:', error);
        // Add text label as fallback
        const textLabel = new fabric.Text(image.displayName, {
          left: columnX,
          top: labelY,
          fontSize: 12,
          fontFamily: 'Arial',
          fill: '#000000',
          originX: 'left'
        });
        this.worksheetCanvas.add(textLabel);
        this.answerKeyCanvas.add(textLabel.clone());
      }
    }

    // Add grid lines
    this.addGridLines(gridStartX, gridStartY, images.length, maxRows, imageSize, spacing);
    
    // Add count questions
    this.addCountQuestions(gridStartY + maxRows * spacing + 80);

    this.worksheetCanvas.renderAll();
    this.answerKeyCanvas.renderAll();
  }

  addGridLines(startX, startY, columns, rows, imageSize, spacing) {
    // Vertical lines
    for (let i = 0; i <= columns; i++) {
      const x = startX + i * (imageSize + 30) - 5;
      const line = new fabric.Line([x, startY - 10, x, startY + rows * spacing + 10], {
        stroke: '#cccccc',
        strokeWidth: 1,
        selectable: false
      });
      this.worksheetCanvas.add(line);
      this.answerKeyCanvas.add(line.clone());
    }

    // Horizontal lines
    for (let i = 0; i <= rows; i++) {
      const y = startY + i * spacing - 5;
      const line = new fabric.Line([startX - 10, y, startX + columns * (imageSize + 30) - 10, y], {
        stroke: '#cccccc',
        strokeWidth: 1,
        selectable: false
      });
      this.worksheetCanvas.add(line);
      this.answerKeyCanvas.add(line.clone());
    }
  }

  addCountQuestions(startY) {
    // Add counting questions
    const questions = [
      'Which item appears most often?',
      'Which item appears least often?',
      'How many items are there in total?'
    ];

    questions.forEach((question, index) => {
      const questionText = new fabric.Text(`${index + 1}. ${question}`, {
        left: 50,
        top: startY + index * 30,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#000000'
      });
      
      // Add line for answer
      const answerLine = new fabric.Line([
        questionText.left + questionText.width + 20,
        questionText.top + 10,
        questionText.left + questionText.width + 200,
        questionText.top + 10
      ], {
        stroke: '#000000',
        strokeWidth: 1,
        selectable: false
      });

      this.worksheetCanvas.add(questionText, answerLine);
      
      // Add answers to answer key
      const answerText = questionText.clone();
      this.answerKeyCanvas.add(answerText, answerLine.clone());
      
      // Add the actual answer
      let answer = '';
      if (index === 0) {
        // Most frequent
        const max = Math.max(...this.currentChart.images.map(item => item.quantity));
        const maxItem = this.currentChart.images.find(item => item.quantity === max);
        answer = maxItem ? maxItem.image.displayName : '';
      } else if (index === 1) {
        // Least frequent
        const min = Math.min(...this.currentChart.images.map(item => item.quantity));
        const minItem = this.currentChart.images.find(item => item.quantity === min);
        answer = minItem ? minItem.image.displayName : '';
      } else if (index === 2) {
        // Total count
        answer = this.currentChart.images.reduce((sum, item) => sum + item.quantity, 0).toString();
      }
      
      if (answer) {
        const answerValueText = new fabric.Text(answer, {
          left: answerLine.left + 10,
          top: answerLine.top - 8,
          fontSize: 12,
          fontFamily: 'Arial',
          fill: '#ff0000',
          fontWeight: 'bold'
        });
        this.answerKeyCanvas.add(answerValueText);
      }
    });

    // Store questions for reference
    this.currentChart.questions = questions;
  }

  getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#fad4d4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createFabricImage(src, size, x, y) {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(src, (img) => {
        img.set({
          left: x,
          top: y,
          scaleX: size / img.width,
          scaleY: size / img.height,
          selectable: false
        });
        resolve(img);
      }, { crossOrigin: 'anonymous' });
    });
  }

  enableDownloadButtons(enabled) {
    this.shadowRoot.getElementById('downloadWsJpegBtn').disabled = !enabled;
    this.shadowRoot.getElementById('downloadAkJpegBtn').disabled = !enabled;
    this.shadowRoot.getElementById('downloadWsPdfBtn').disabled = !enabled;
    this.shadowRoot.getElementById('downloadAkPdfBtn').disabled = !enabled;
  }

  showMessage(text, type = 'info') {
    const messageElement = this.shadowRoot.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = type;
    
    if (type === 'success') {
      setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = '';
      }, 3000);
    }
  }

  setupEventListeners() {
    // Accordion functionality
    this.shadowRoot.querySelectorAll('.accordion-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const content = e.target.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        button.classList.toggle('active', !isActive);
        content.classList.toggle('active', !isActive);
      });
    });

    // Tab functionality
    this.shadowRoot.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const tabId = e.target.getAttribute('data-tab');
        
        this.shadowRoot.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        this.shadowRoot.getElementById(tabId).classList.add('active');
      });
    });

    // Dropdown functionality
    this.shadowRoot.querySelectorAll('.dropdown-container button').forEach(button => {
      button.addEventListener('click', (e) => {
        if (button.id.includes('Dropdown')) {
          e.preventDefault();
          const dropdown = button.nextElementSibling;
          dropdown.classList.toggle('show');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.shadowRoot.contains(e.target)) {
        this.shadowRoot.querySelectorAll('.dropdown-content').forEach(dropdown => {
          dropdown.classList.remove('show');
        });
      }
    });

    // Theme selector
    this.shadowRoot.getElementById('themeSelect').addEventListener('change', (e) => {
      const theme = e.target.value;
      const filteredImages = theme ? 
        this._images.filter(img => img.theme === theme) : 
        this._images;
      this.displayImages(filteredImages);
    });

    // Search functionality
    this.shadowRoot.getElementById('searchInput').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const theme = this.shadowRoot.getElementById('themeSelect').value;
      
      let filteredImages = theme ? 
        this._images.filter(img => img.theme === theme) : 
        this._images;
        
      if (searchTerm) {
        filteredImages = filteredImages.filter(img => 
          img.displayName.toLowerCase().includes(searchTerm) ||
          img.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      this.displayImages(filteredImages);
    });

    // File upload
    this.shadowRoot.getElementById('imageUploadInput').addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files);
    });

    // Page size change
    this.shadowRoot.getElementById('pageSizeSelect').addEventListener('change', (e) => {
      const customInputs = this.shadowRoot.getElementById('customPageSizeInputs');
      customInputs.style.display = e.target.value === 'custom' ? 'block' : 'none';
    });

    // Apply page size
    this.shadowRoot.getElementById('setPageSizeBtn').addEventListener('click', () => {
      this.applyPageSize();
    });

    // Add text
    this.shadowRoot.getElementById('addTextBtn').addEventListener('click', () => {
      this.addText();
    });

    // Generate worksheet
    this.shadowRoot.getElementById('generateWorksheetBtn').addEventListener('click', () => {
      this.generateWorksheet();
    });

    // Generate answer key
    this.shadowRoot.getElementById('generateSolutionBtn').addEventListener('click', () => {
      this.generateAnswerKey();
    });

    // Download buttons
    this.shadowRoot.getElementById('downloadWsJpegBtn').addEventListener('click', () => {
      this.downloadWorksheet('jpeg');
    });
    
    this.shadowRoot.getElementById('downloadAkJpegBtn').addEventListener('click', () => {
      this.downloadAnswerKey('jpeg');
    });
    
    this.shadowRoot.getElementById('downloadWsPdfBtn').addEventListener('click', () => {
      this.downloadWorksheet('pdf');
    });
    
    this.shadowRoot.getElementById('downloadAkPdfBtn').addEventListener('click', () => {
      this.downloadAnswerKey('pdf');
    });

    // Clear all
    this.shadowRoot.getElementById('clearBtn').addEventListener('click', () => {
      this.clearAll();
    });
  }

  handleFileUpload(files) {
    const preview = this.shadowRoot.getElementById('uploadedImagesPreview');
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = {
            fileKey: `uploaded_${Date.now()}_${file.name}`,
            displayName: file.name.split('.')[0],
            url: e.target.result,
            theme: 'uploaded'
          };
          
          this.uploadedImages.push(imageData);
          if (this.selectedImages.length < 6) {
            this.selectedImages.push(imageData);
            this.updateSelectedImagesPreview();
            this.updateSelectedCount();
          }
          this.updateUploadedImagesPreview();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  updateUploadedImagesPreview() {
    const preview = this.shadowRoot.getElementById('uploadedImagesPreview');
    preview.innerHTML = '';

    if (this.uploadedImages.length === 0) {
      preview.innerHTML = '<p class="dictionary-message">Your uploaded images will appear here.</p>';
      return;
    }

    this.uploadedImages.forEach(image => {
      const item = document.createElement('div');
      item.className = 'dictionary-item';
      item.innerHTML = `
        <img src="${image.url}" alt="${image.displayName}">
        <span>${image.displayName}</span>
      `;
      preview.appendChild(item);
    });
  }

  applyPageSize() {
    const select = this.shadowRoot.getElementById('pageSizeSelect');
    let width, height;

    if (select.value === 'custom') {
      width = parseInt(this.shadowRoot.getElementById('pageWidth').value) || 792;
      height = parseInt(this.shadowRoot.getElementById('pageHeight').value) || 612;
    } else {
      [width, height] = select.value.split('x').map(Number);
    }

    if (this.worksheetCanvas && this.answerKeyCanvas) {
      this.worksheetCanvas.setDimensions({ width, height });
      this.answerKeyCanvas.setDimensions({ width, height });
      this.showMessage(`Page size set to ${width}x${height}`, 'success');
    }
  }

  addText() {
    const textInput = this.shadowRoot.getElementById('textInput');
    const text = textInput.value.trim();
    
    if (!text) return;
    
    const fabricText = new fabric.Text(text, {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000'
    });

    this.worksheetCanvas.add(fabricText);
    textInput.value = '';
    this.showMessage('Text added to worksheet', 'success');
  }

  generateAnswerKey() {
    this.showMessage('Answer key is ready! Switch to the Answer Key tab to view.', 'success');
  }

  downloadWorksheet(format) {
    const link = document.createElement('a');
    if (format === 'jpeg') {
      link.download = 'picture-graph-worksheet.jpg';
      link.href = this.worksheetCanvas.toDataURL('image/jpeg');
    } else {
      link.download = 'picture-graph-worksheet.png';
      link.href = this.worksheetCanvas.toDataURL();
    }
    link.click();
    this.showMessage('Worksheet downloaded!', 'success');
  }

  downloadAnswerKey(format) {
    const link = document.createElement('a');
    if (format === 'jpeg') {
      link.download = 'picture-graph-answer-key.jpg';
      link.href = this.answerKeyCanvas.toDataURL('image/jpeg');
    } else {
      link.download = 'picture-graph-answer-key.png';
      link.href = this.answerKeyCanvas.toDataURL();
    }
    link.click();
    this.showMessage('Answer key downloaded!', 'success');
  }

  clearAll() {
    if (confirm('Are you sure you want to clear everything?')) {
      this.worksheetCanvas?.clear();
      this.answerKeyCanvas?.clear();
      this.selectedImages = [];
      this.uploadedImages = [];
      this.currentChart = null;
      
      this.updateSelectedImagesPreview();
      this.updateUploadedImagesPreview();
      this.updateSelectedCount();
      
      this.shadowRoot.getElementById('generateSolutionBtn').disabled = true;
      this.shadowRoot.getElementById('downloadDropdownBtn').disabled = true;
      this.enableDownloadButtons(false);
      
      this.showMessage('All content cleared.', 'success');
    }
  }

  cleanup() {
    // Clean up Fabric.js instances
    this.fabricInstances.forEach(instance => {
      instance?.dispose();
    });
    this.fabricInstances.clear();
  }
}

customElements.define('lcs-chart-count-color', ChartCountColorGenerator);