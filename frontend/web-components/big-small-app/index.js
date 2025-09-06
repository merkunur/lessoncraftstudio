import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class BigSmallAppGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = [];
    this.uploadedImages = [];
    this.worksheetCanvas = null;
    this.answerKeyCanvas = null;
    this.fabricInstances = new Set();
    this.currentExercises = [];
  }

  get appName() {
    return 'big-small-app';
  }

  getDefaultTranslations() {
    return {
      en: {
        bigSmallApp: {
          title: 'Big & Small Worksheet Generator',
          pageSetup: 'Page Setup',
          pageSize: 'Page Size',
          pageColor: 'Page Color',
          includeNameDate: 'Include Name/Date Fields',
          textTools: 'Text Tools',
          addNewText: 'Add New Text',
          content: 'Content',
          addText: 'Add Text',
          color: 'Color',
          size: 'Size',
          font: 'Font',
          exerciseSettings: 'Exercise Settings',
          exerciseCount: 'Number of Exercises (1–10)',
          imagesPerExercise: 'Images per Exercise',
          imageMode: 'Image Mode',
          identicalImages: 'Identical Images',
          differentImages: 'Different Images',
          questionType: 'Question Type',
          findSmall: 'Circle the small one',
          findBig: 'Circle the big one',
          findMed: 'Circle the medium one',
          orderAsc: 'Number 1-2-3 (small to big)',
          orderDesc: 'Number 1-2-3 (big to small)',
          addIndicators: 'Add answer indicators (circles/boxes)',
          addNumbers: 'Add exercise numbers',
          imageLibrary: 'Image Library',
          selectTheme: 'Select Theme for Dictionary',
          searchImages: 'Search Images',
          selectedCount: 'Selected: {count} images',
          availableImages: 'Available Images',
          selectedImages: 'Selected Images for Problems',
          uploadCustom: 'Upload Custom Images',
          selectFiles: 'Select image(s) to upload',
          uploadedImages: 'Your Uploaded Images (This Session)',
          generate: 'Generate Worksheet',
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
          generating: 'Generating worksheet...',
          noImagesError: 'Please select at least one image or set a theme'
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
        font-size: 22px;
        font-weight: 600;
        color: var(--app-text-primary-dark-theme);
        margin: 0;
      }

      .panel-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: 10px 15px;
      }

      .accordion-item {
        background-color: transparent;
        border-bottom: 1px solid var(--app-border-dark);
        margin-bottom: 0;
        overflow: hidden;
      }

      .accordion-item:last-child {
        border-bottom: none;
      }

      .accordion-button {
        background-color: transparent;
        color: var(--app-text-primary-dark-theme);
        width: 100%;
        border: none;
        text-align: left;
        padding: 18px 10px;
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
        padding: 10px 10px 20px 10px;
        display: none;
        background-color: transparent;
      }

      .accordion-content.active {
        display: block;
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

      .main {
        flex: 1;
        background-color: var(--app-bg-light);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .top-right-actions {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 20;
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
        padding: 20px;
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

      .panel-footer {
        padding: 15px 25px;
        border-top: 1px solid var(--app-border-dark);
        margin-top: auto;
        background-color: var(--app-bg-dark);
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
            <h2 data-i18n="bigSmallApp.title">Big & Small Worksheet Generator</h2>
          </div>
          <div class="panel-content">
            
            <!-- Page Setup -->
            <div class="accordion-item">
              <button class="accordion-button active" data-section="pageSetup">
                <span data-i18n="bigSmallApp.pageSetup">Page Setup</span>
              </button>
              <div class="accordion-content active">
                <h4>Configuration</h4>
                <label for="pageSizeSelect" data-i18n="bigSmallApp.pageSize">Page Size:</label>
                <select id="pageSizeSelect">
                  <option value="800x1000">Default Worksheet (800x1000)</option>
                  <option value="595x842">A4 Portrait (595x842)</option>
                  <option value="842x595">A4 Landscape (842x595)</option>
                  <option value="612x792" selected>Letter Portrait (612x792)</option>
                  <option value="792x612">Letter Landscape (792x612)</option>
                  <option value="custom">Custom</option>
                </select>
                
                <div id="customPageSizeInputs" style="display:none;">
                  <label for="pageWidth">Width (px):</label>
                  <input type="number" id="pageWidth" value="800">
                  <label for="pageHeight">Height (px):</label>
                  <input type="number" id="pageHeight" value="1000">
                </div>
                
                <label for="pageColor" data-i18n="bigSmallApp.pageColor">Page Color:</label>
                <input type="color" id="pageColor" value="#FFFFFF">
                
                <label for="includeNameDate" class="checkbox-label">
                  <input type="checkbox" id="includeNameDate">
                  <span data-i18n="bigSmallApp.includeNameDate">Include Name/Date Fields</span>
                </label>
                
                <button id="setPageSizeBtn">Apply Size</button>
              </div>
            </div>

            <!-- Exercise Settings -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="exerciseSettings">
                <span data-i18n="bigSmallApp.exerciseSettings">Exercise Settings</span>
              </button>
              <div class="accordion-content">
                <label for="problemCount" data-i18n="bigSmallApp.exerciseCount">Number of Exercises (1–10):</label>
                <input type="number" id="problemCount" value="4" min="1" max="10">
                
                <label for="imgCount" data-i18n="bigSmallApp.imagesPerExercise">Images per Exercise:</label>
                <select id="imgCount">
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                
                <label for="mode" data-i18n="bigSmallApp.imageMode">Image Mode:</label>
                <select id="mode">
                  <option value="identical" data-i18n="bigSmallApp.identicalImages">Identical Images</option>
                  <option value="different" selected data-i18n="bigSmallApp.differentImages">Different Images</option>
                </select>
                
                <label for="qType" data-i18n="bigSmallApp.questionType">Question Type:</label>
                <select id="qType">
                  <option value="findSmall" data-i18n="bigSmallApp.findSmall">Circle the small one</option>
                  <option value="findBig" selected data-i18n="bigSmallApp.findBig">Circle the big one</option>
                  <option value="findMed" data-i18n="bigSmallApp.findMed">Circle the medium one</option>
                  <option value="orderAsc" data-i18n="bigSmallApp.orderAsc">Number 1-2-3 (small to big)</option>
                  <option value="orderDesc" data-i18n="bigSmallApp.orderDesc">Number 1-2-3 (big to small)</option>
                </select>
                
                <label for="addIndicatorsCheckbox" class="checkbox-label">
                  <input type="checkbox" id="addIndicatorsCheckbox">
                  <span data-i18n="bigSmallApp.addIndicators">Add answer indicators (circles/boxes)</span>
                </label>
                
                <label for="addExerciseNumbersCheckbox" class="checkbox-label">
                  <input type="checkbox" id="addExerciseNumbersCheckbox" checked>
                  <span data-i18n="bigSmallApp.addNumbers">Add exercise numbers</span>
                </label>
                
                <label for="worksheetThemeSelect">Worksheet Theme (if not picking images):</label>
                <select id="worksheetThemeSelect"></select>
              </div>
            </div>

            <!-- Image Library -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="imageLibrary">
                <span data-i18n="bigSmallApp.imageLibrary">Image Library</span>
              </button>
              <div class="accordion-content">
                <label for="dictionaryThemeSelect" data-i18n="bigSmallApp.selectTheme">Select Theme for Dictionary:</label>
                <select id="dictionaryThemeSelect"></select>
                
                <label for="searchInput" data-i18n="bigSmallApp.searchImages">Search Images:</label>
                <input type="text" id="searchInput" placeholder="e.g., apple, car">
                
                <p class="selected-count" id="selectedCountMsg" data-i18n="bigSmallApp.selectedCount">Selected: 0 images</p>
                
                <label data-i18n="bigSmallApp.availableImages">Available Images:</label>
                <div id="dictionary">
                  <p class="dictionary-message">Loading images...</p>
                </div>
                
                <label data-i18n="bigSmallApp.selectedImages">Selected Images for Problems:</label>
                <div id="selectedImagesPreview"></div>
              </div>
            </div>

            <!-- Upload Custom Images -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="uploadCustom">
                <span data-i18n="bigSmallApp.uploadCustom">Upload Custom Images</span>
              </button>
              <div class="accordion-content">
                <label for="imageUploadInput" data-i18n="bigSmallApp.selectFiles">Select image(s) to upload:</label>
                <input type="file" id="imageUploadInput" multiple accept="image/*">
                
                <label data-i18n="bigSmallApp.uploadedImages">Your Uploaded Images (This Session):</label>
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
            <button id="generateWorksheetBtn" class="action-button accent">
              <span data-i18n="bigSmallApp.generate">Generate Worksheet</span>
            </button>
            <button id="generateAnswerKeyBtn" class="action-button secondary" disabled>
              <span data-i18n="bigSmallApp.generateAnswerKey">Generate Answer Key</span>
            </button>
            <button id="downloadBtn" class="action-button secondary" disabled>
              <span data-i18n="bigSmallApp.download">Download</span>
            </button>
            <button id="clearBtn" class="action-button danger">
              <span data-i18n="bigSmallApp.clearAll">Clear All</span>
            </button>
          </div>

          <div class="tab-row">
            <button class="tab-button active" data-tab="worksheetTab">
              <span data-i18n="bigSmallApp.worksheet">Worksheet</span>
            </button>
            <button class="tab-button" data-tab="answerKeyTab">
              <span data-i18n="bigSmallApp.answerKey">Answer Key</span>
            </button>
          </div>

          <div class="tab-content-wrapper">
            <div class="tab active" id="worksheetTab">
              <div class="canvas-container-wrapper">
                <canvas id="worksheetCanvasElement"></canvas>
              </div>
            </div>
            <div class="tab" id="answerKeyTab">
              <div class="canvas-container-wrapper">
                <canvas id="answerKeyCanvasElement"></canvas>
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

    const worksheetCanvas = this.shadowRoot.getElementById('worksheetCanvasElement');
    const answerKeyCanvas = this.shadowRoot.getElementById('answerKeyCanvasElement');

    if (worksheetCanvas && answerKeyCanvas) {
      this.worksheetCanvas = new fabric.Canvas(worksheetCanvas, {
        width: 612,
        height: 792,
        backgroundColor: '#ffffff'
      });

      this.answerKeyCanvas = new fabric.Canvas(answerKeyCanvas, {
        width: 612,
        height: 792,
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

    // Group images by theme for theme selector
    const themes = [...new Set(this._images.map(img => img.theme).filter(Boolean))];
    const themeSelect = this.shadowRoot.getElementById('dictionaryThemeSelect');
    const worksheetThemeSelect = this.shadowRoot.getElementById('worksheetThemeSelect');
    
    themeSelect.innerHTML = '<option value="">All Themes</option>';
    worksheetThemeSelect.innerHTML = '<option value="">Random Images</option>';
    
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
    const countMsg = this.shadowRoot.getElementById('selectedCountMsg');
    const count = this.selectedImages.length;
    countMsg.textContent = this.getTranslation('bigSmallApp.selectedCount').replace('{count}', count);
  }

  async generateWorksheet() {
    const settings = this.getWorksheetSettings();
    
    if (this.selectedImages.length === 0 && !settings.worksheetTheme) {
      this.showMessage(this.getTranslation('bigSmallApp.noImagesError'), 'error');
      return;
    }

    this.showMessage(this.getTranslation('bigSmallApp.generating'));
    
    try {
      // Clear canvases
      this.worksheetCanvas.clear();
      this.answerKeyCanvas.clear();
      
      // Set canvas size
      const [width, height] = settings.pageSize.split('x').map(Number);
      this.worksheetCanvas.setDimensions({ width, height });
      this.answerKeyCanvas.setDimensions({ width, height });
      
      // Set background color
      this.worksheetCanvas.backgroundColor = settings.pageColor;
      this.answerKeyCanvas.backgroundColor = settings.pageColor;
      
      // Add name/date fields if enabled
      if (settings.includeNameDate) {
        this.addNameDateFields();
      }
      
      // Generate exercises
      await this.generateExercises(settings);
      
      // Enable answer key and download buttons
      this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = false;
      this.shadowRoot.getElementById('downloadBtn').disabled = false;
      
      this.showMessage('Worksheet generated successfully!', 'success');
      
      // Emit worksheet generated event
      this.emit('worksheet-generated', {
        type: 'big-small-app',
        settings,
        exercises: this.currentExercises
      });
      
    } catch (error) {
      console.error('Error generating worksheet:', error);
      this.showMessage('Error generating worksheet. Please try again.', 'error');
    }
  }

  getWorksheetSettings() {
    return {
      pageSize: this.shadowRoot.getElementById('pageSizeSelect').value,
      pageColor: this.shadowRoot.getElementById('pageColor').value,
      includeNameDate: this.shadowRoot.getElementById('includeNameDate').checked,
      problemCount: parseInt(this.shadowRoot.getElementById('problemCount').value),
      imgCount: parseInt(this.shadowRoot.getElementById('imgCount').value),
      mode: this.shadowRoot.getElementById('mode').value,
      questionType: this.shadowRoot.getElementById('qType').value,
      addIndicators: this.shadowRoot.getElementById('addIndicatorsCheckbox').checked,
      addExerciseNumbers: this.shadowRoot.getElementById('addExerciseNumbersCheckbox').checked,
      worksheetTheme: this.shadowRoot.getElementById('worksheetThemeSelect').value
    };
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
      left: 400,
      top: 30,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#000000'
    });

    this.worksheetCanvas.add(nameText, dateText);
    this.answerKeyCanvas.add(nameText.clone(), dateText.clone());
  }

  async generateExercises(settings) {
    this.currentExercises = [];
    const startY = settings.includeNameDate ? 80 : 40;
    const exerciseHeight = (this.worksheetCanvas.height - startY - 40) / settings.problemCount;

    for (let i = 0; i < settings.problemCount; i++) {
      const exercise = await this.createExercise(settings, i, startY + i * exerciseHeight);
      this.currentExercises.push(exercise);
    }

    this.worksheetCanvas.renderAll();
    this.answerKeyCanvas.renderAll();
  }

  async createExercise(settings, exerciseIndex, yPosition) {
    const exercise = {
      index: exerciseIndex,
      images: [],
      correctAnswer: null,
      yPosition
    };

    // Add exercise number if enabled
    if (settings.addExerciseNumbers) {
      const numberText = new fabric.Text(`${exerciseIndex + 1}.`, {
        left: 30,
        top: yPosition,
        fontSize: 18,
        fontFamily: 'Arial',
        fill: '#000000',
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(numberText);
      this.answerKeyCanvas.add(numberText.clone());
    }

    // Select images for this exercise
    const exerciseImages = this.selectImagesForExercise(settings);
    
    // Create image objects with different sizes
    const imageSizes = this.generateImageSizes(settings.imgCount, settings.questionType);
    const imageSpacing = (this.worksheetCanvas.width - 120) / settings.imgCount;

    for (let i = 0; i < settings.imgCount; i++) {
      const imageData = exerciseImages[i % exerciseImages.length];
      const size = imageSizes[i];
      const xPosition = 80 + i * imageSpacing;

      try {
        const fabricImage = await this.createFabricImage(imageData.url, size, xPosition, yPosition + 30);
        this.worksheetCanvas.add(fabricImage);
        this.answerKeyCanvas.add(fabricImage.clone());

        exercise.images.push({
          imageData,
          size,
          position: { x: xPosition, y: yPosition + 30 }
        });

        // Determine correct answer based on question type
        if (this.isCorrectAnswer(settings.questionType, size, imageSizes)) {
          exercise.correctAnswer = i;
          
          // Add answer indicator on answer key if enabled
          if (settings.addIndicators) {
            const indicator = new fabric.Circle({
              left: xPosition + size / 2 - 15,
              top: yPosition + 20,
              radius: 15,
              fill: 'transparent',
              stroke: '#ff0000',
              strokeWidth: 3
            });
            this.answerKeyCanvas.add(indicator);
          }
        }
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }

    return exercise;
  }

  selectImagesForExercise(settings) {
    if (settings.worksheetTheme) {
      // Use theme-based images
      const themeImages = this._images.filter(img => img.theme === settings.worksheetTheme);
      return themeImages.length > 0 ? themeImages : this._images.slice(0, 10);
    }
    
    // Use selected images
    return this.selectedImages.length > 0 ? this.selectedImages : this._images.slice(0, 10);
  }

  generateImageSizes(imgCount, questionType) {
    const baseSizes = [60, 80, 100]; // Small, medium, large
    const sizes = [];

    if (questionType === 'findSmall' || questionType === 'findBig') {
      // Generate one small/big and rest different
      if (imgCount === 2) {
        sizes.push(questionType === 'findSmall' ? 60 : 100);
        sizes.push(questionType === 'findSmall' ? 80 : 80);
      } else {
        sizes.push(questionType === 'findSmall' ? 60 : 100);
        sizes.push(80, 85);
      }
    } else if (questionType === 'findMed') {
      sizes.push(60, 80, 100); // Small, medium, large
    } else if (questionType.includes('order')) {
      // Generate ordered sizes
      if (imgCount === 2) {
        sizes.push(60, 80);
      } else {
        sizes.push(60, 80, 100);
      }
      
      if (questionType === 'orderDesc') {
        sizes.reverse();
      }
    }

    // Shuffle positions but keep size order for answers
    const shuffledPositions = [...Array(imgCount).keys()].sort(() => Math.random() - 0.5);
    const result = new Array(imgCount);
    
    sizes.forEach((size, index) => {
      result[shuffledPositions[index]] = size;
    });

    return result;
  }

  isCorrectAnswer(questionType, currentSize, allSizes) {
    switch (questionType) {
      case 'findSmall':
        return currentSize === Math.min(...allSizes);
      case 'findBig':
        return currentSize === Math.max(...allSizes);
      case 'findMed':
        const sorted = [...allSizes].sort((a, b) => a - b);
        return currentSize === sorted[Math.floor(sorted.length / 2)];
      default:
        return false;
    }
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
        
        // Toggle accordion
        button.classList.toggle('active', !isActive);
        content.classList.toggle('active', !isActive);
      });
    });

    // Tab functionality
    this.shadowRoot.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const tabId = e.target.getAttribute('data-tab');
        
        // Update active tab button
        this.shadowRoot.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active tab content
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        this.shadowRoot.getElementById(tabId).classList.add('active');
      });
    });

    // Theme selector
    this.shadowRoot.getElementById('dictionaryThemeSelect').addEventListener('change', (e) => {
      const theme = e.target.value;
      const filteredImages = theme ? 
        this._images.filter(img => img.theme === theme) : 
        this._images;
      this.displayImages(filteredImages);
    });

    // Search functionality
    this.shadowRoot.getElementById('searchInput').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const theme = this.shadowRoot.getElementById('dictionaryThemeSelect').value;
      
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

    // Generate worksheet
    this.shadowRoot.getElementById('generateWorksheetBtn').addEventListener('click', () => {
      this.generateWorksheet();
    });

    // Generate answer key
    this.shadowRoot.getElementById('generateAnswerKeyBtn').addEventListener('click', () => {
      this.generateAnswerKey();
    });

    // Download
    this.shadowRoot.getElementById('downloadBtn').addEventListener('click', () => {
      this.downloadWorksheet();
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
          this.selectedImages.push(imageData);
          this.updateUploadedImagesPreview();
          this.updateSelectedImagesPreview();
          this.updateSelectedCount();
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
      width = parseInt(this.shadowRoot.getElementById('pageWidth').value) || 800;
      height = parseInt(this.shadowRoot.getElementById('pageHeight').value) || 1000;
    } else {
      [width, height] = select.value.split('x').map(Number);
    }

    if (this.worksheetCanvas && this.answerKeyCanvas) {
      this.worksheetCanvas.setDimensions({ width, height });
      this.answerKeyCanvas.setDimensions({ width, height });
      this.showMessage(`Page size set to ${width}x${height}`, 'success');
    }
  }

  generateAnswerKey() {
    // Answer key is generated along with worksheet
    this.showMessage('Answer key is ready! Switch to the Answer Key tab to view.', 'success');
  }

  downloadWorksheet() {
    // Export worksheet as PDF
    const link = document.createElement('a');
    link.download = 'big-small-worksheet.png';
    link.href = this.worksheetCanvas.toDataURL();
    link.click();
    
    this.showMessage('Worksheet downloaded!', 'success');
  }

  clearAll() {
    if (confirm('Are you sure you want to clear everything?')) {
      this.worksheetCanvas?.clear();
      this.answerKeyCanvas?.clear();
      this.selectedImages = [];
      this.uploadedImages = [];
      this.currentExercises = [];
      
      this.updateSelectedImagesPreview();
      this.updateUploadedImagesPreview();
      this.updateSelectedCount();
      
      this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = true;
      this.shadowRoot.getElementById('downloadBtn').disabled = true;
      
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

customElements.define('lcs-big-small-app', BigSmallAppGenerator);