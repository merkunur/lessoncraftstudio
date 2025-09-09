import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class CodeAdditionGenerator extends BaseWebComponent {
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
    return 'code-addition';
  }

  getDefaultTranslations() {
    return {
      en: {
        codeAddition: {
          title: 'Image Addition',
          pageSetup: 'Page Setup',
          pageSize: 'Page Size',
          pageColor: 'Page Color',
          background: 'Background',
          theme: 'Theme',
          opacity: 'Opacity',
          border: 'Border',
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
          uploadYourOwn: 'Upload Your Own',
          chooseFiles: 'Choose Files...',
          themeImages: 'Theme Images',
          searchImages: 'Search Images',
          selectedImages: 'Selected Images',
          selectedCount: 'Selected: {count} / 5',
          worksheetContent: 'Worksheet Content',
          generationMethod: 'Generation Method',
          useSelected: 'Use Manually Selected Images',
          exerciseCount: 'Number of Exercises',
          exerciseHelp: 'Select a theme to randomly generate problems each time you click \'Generate\'. Or, use the Image Library to pick specific images.',
          optionalSettings: 'Optional Settings',
          includeNameDate: 'Include Name/Date Fields',
          includeNumbers: 'Show numbers for each problem',
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
          print: 'Print',
          worksheet: 'Worksheet',
          answerKey: 'Answer Key',
          generating: 'Generating addition worksheet...',
          noImagesError: 'Please select at least 2 images or choose a theme to generate exercises',
          loadingImages: 'Loading images...',
          applySize: 'Apply Size'
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
        overflow: hidden;
      }

      .panel {
        width: var(--sidebar-width);
        min-width: var(--sidebar-width);
        background-color: var(--app-bg-dark);
        color: var(--app-text-primary-dark-theme);
        box-shadow: 2px 0 8px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        z-index: 100;
        transition: transform 0.3s ease-in-out;
      }

      .panel-header {
        padding: 20px 25px;
        text-align: left;
        border-bottom: 1px solid var(--app-border-dark);
        position: relative;
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
        padding: 0;
      }

      .accordion-item {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid var(--app-border-dark);
        margin-bottom: 0;
        overflow: hidden;
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
        background-color: transparent;
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

      .accordion-content input[type="color"] {
        width: 100%;
        padding: 2px;
        height: 38px;
        margin-bottom: 12px;
        border-radius: 5px;
        border-color: var(--app-border-dark);
        background-color: var(--app-surface-dark);
      }

      .accordion-content input[type="range"] {
        width: 100%;
        padding: 0;
        margin-bottom: 12px;
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
        cursor: pointer;
        margin-top: 5px;
      }

      .accordion-content button:hover {
        background-color: #4f4f53;
      }

      .accordion-content input[type="checkbox"] {
        margin-right: 8px;
        vertical-align: middle;
        accent-color: var(--app-accent-primary);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        font-size: 13px;
        margin-bottom: 12px;
        cursor: pointer;
        color: var(--app-text-secondary-dark-theme);
      }

      .button-like-label {
        display: block;
        padding: 8px 12px;
        cursor: pointer;
        background-color: var(--app-surface-dark);
        color: var(--app-text-primary-dark-theme);
        border: 1px solid var(--app-border-dark);
        border-radius: 5px;
        text-align: center;
        margin-bottom: 15px;
        font-size: 13px;
        font-weight: 500;
      }

      .button-like-label:hover {
        background-color: #4f4f53;
      }

      .thumbnail-gallery {
        padding: 10px;
        max-height: 200px;
        overflow-y: auto;
        background-color: var(--app-surface-dark);
        border-radius: 5px;
        margin-top: 8px;
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 15px;
        justify-items: center;
        border: 1px solid var(--app-border-dark);
      }

      .thumbnail-item {
        cursor: pointer;
        text-align: center;
      }

      .thumbnail-image-container {
        background-color: #ffffff;
        width: 80px;
        height: 80px;
        padding: 8px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid transparent;
        transition: border-color 0.15s ease;
      }

      .thumbnail-item:hover .thumbnail-image-container {
        border-color: var(--app-accent-primary);
      }

      .thumbnail-item.selected .thumbnail-image-container {
        border-color: var(--app-accent-primary);
        background-color: rgba(0, 122, 255, 0.1);
      }

      .thumbnail-image-container img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      .thumbnail-text {
        font-size: 10px;
        color: var(--app-text-secondary-dark-theme);
        margin-top: 4px;
        word-break: break-word;
      }

      .dictionary-message {
        color: var(--app-text-secondary-dark-theme);
        width: 100%;
        text-align: center;
        grid-column: 1 / -1;
        padding: 20px;
      }

      #selectedImagesPreview {
        border: 1px solid var(--app-border-dark);
        border-radius: 5px;
        padding: 10px;
        background-color: var(--app-surface-dark);
        margin-bottom: 10px;
        min-height: 60px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
      }

      .selected-count {
        font-size: 12px;
        color: var(--app-text-secondary-dark-theme);
        text-align: center;
        margin-top: 5px;
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
        top: 12px;
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
        margin-top: 60px;
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

      .success {
        color: #10B981;
        text-align: center;
        padding: 10px;
        background-color: rgba(16, 185, 129, 0.1);
        border-radius: 5px;
        margin: 10px 0;
      }

      hr {
        border-color: var(--app-border-dark);
        margin: 20px 0;
      }

      input[type="file"] {
        display: none;
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

        .tab-row {
          margin-top: 0;
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
            <h2 data-i18n="codeAddition.title">Image Addition</h2>
          </div>
          <div class="panel-content">
            
            <!-- Page Setup -->
            <div class="accordion-item">
              <button class="accordion-button active" data-section="pageSetup">
                <span data-i18n="codeAddition.pageSetup">Page Setup</span>
              </button>
              <div class="accordion-content active">
                <label for="pageSizeSelect" data-i18n="codeAddition.pageSize">Page Size:</label>
                <select id="pageSizeSelect">
                  <option value="612x792" selected>Letter Portrait (612x792)</option>
                  <option value="792x612">Letter Landscape (792x612)</option>
                  <option value="595x842">A4 Portrait (595x842)</option>
                  <option value="842x595">A4 Landscape (842x595)</option>
                  <option value="816x1056">Default (816x1056)</option>
                  <option value="1200x1200">Square (1200x1200)</option>
                  <option value="custom">Custom</option>
                </select>
                
                <div id="customPageSizeInputs" style="display:none;">
                  <label for="pageWidth">Width (px):</label>
                  <input type="number" id="pageWidth" value="612">
                  <label for="pageHeight">Height (px):</label>
                  <input type="number" id="pageHeight" value="792">
                </div>
                
                <label for="pageColor" data-i18n="codeAddition.pageColor">Page Color:</label>
                <input type="color" id="pageColor" value="#FFFFFF">
                <button id="setPageSizeBtn" data-i18n="codeAddition.applySize">Apply Size</button>

                <hr>
                
                <h4 data-i18n="codeAddition.background">Background</h4>
                <label for="backgroundThemeSelect" data-i18n="codeAddition.theme">Theme:</label>
                <select id="backgroundThemeSelect">
                  <option value="">None</option>
                </select>
                <div id="backgroundThumbnailGallery" class="thumbnail-gallery" style="display: none;"></div>
                <div id="backgroundControls" style="display: none; margin-top: 10px;">
                  <label for="backgroundOpacity" data-i18n="codeAddition.opacity">Opacity:</label>
                  <input type="range" id="backgroundOpacity" min="0" max="1" value="1" step="0.05">
                </div>

                <hr>

                <h4 data-i18n="codeAddition.border">Border</h4>
                <label for="borderThemeSelect" data-i18n="codeAddition.theme">Theme:</label>
                <select id="borderThemeSelect">
                  <option value="">None</option>
                </select>
                <div id="borderThumbnailGallery" class="thumbnail-gallery" style="display: none;"></div>
                <div id="borderControls" style="display: none; margin-top: 10px;">
                  <label for="borderOpacity" data-i18n="codeAddition.opacity">Opacity:</label>
                  <input type="range" id="borderOpacity" min="0" max="1" value="1" step="0.05">
                </div>
              </div>
            </div>

            <!-- Text Tools -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="textTools">
                <span data-i18n="codeAddition.textTools">Text Tools</span>
              </button>
              <div class="accordion-content">
                <h4 data-i18n="codeAddition.addNewText">Add New Text</h4>
                <label for="textInput" data-i18n="codeAddition.content">Content:</label>
                <input type="text" id="textInput" placeholder="Hello!">
                <button id="addTextBtn" data-i18n="codeAddition.addText">Add Text</button>
                
                <h4 data-i18n="codeAddition.selectedTextProps">Selected Text Properties</h4>
                <label for="textColor" data-i18n="codeAddition.color">Color:</label>
                <input type="color" id="textColor" value="#333333" disabled>
                
                <label for="fontSize" data-i18n="codeAddition.size">Size:</label>
                <input type="number" id="fontSize" value="48" min="8" disabled>
                
                <label for="fontFamily" data-i18n="codeAddition.font">Font:</label>
                <select id="fontFamily" disabled>
                  <option value="Lexend Deca">Lexend Deca</option>
                  <option value="Baloo 2">Baloo 2</option>
                  <option value="Nunito">Nunito</option>
                  <option value="Quicksand">Quicksand</option>
                  <option value="Fredoka">Fredoka</option>
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                </select>
                
                <label for="textStrokeColor" data-i18n="codeAddition.outlineColor">Outline Color:</label>
                <input type="color" id="textStrokeColor" value="#000000" disabled>
                
                <label for="textStrokeWidth" data-i18n="codeAddition.outline">Outline (0-10):</label>
                <input type="range" id="textStrokeWidth" min="0" max="10" value="0" step="0.5" disabled>
              </div>
            </div>

            <!-- Image Library -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="imageLibrary">
                <span data-i18n="codeAddition.imageLibrary">Image Library</span>
              </button>
              <div class="accordion-content">
                <h4 data-i18n="codeAddition.uploadYourOwn">Upload Your Own</h4>
                <input type="file" id="imageUpload" multiple accept="image/*">
                <label for="imageUpload" class="button-like-label" data-i18n="codeAddition.chooseFiles">Choose Files...</label>
                <div id="userImageGallery" class="thumbnail-gallery" style="display: none;"></div>

                <hr>

                <h4 data-i18n="codeAddition.themeImages">Theme Images</h4>
                <label for="themeSelect" data-i18n="codeAddition.theme">Theme:</label>
                <select id="themeSelect"></select>
                
                <label for="searchInput" data-i18n="codeAddition.searchImages">Search Images:</label>
                <input type="text" id="searchInput" placeholder="e.g., apple, car">
                
                <div id="dictionary" class="thumbnail-gallery">
                  <p class="dictionary-message" data-i18n="codeAddition.loadingImages">Loading images...</p>
                </div>

                <hr>

                <h4 data-i18n="codeAddition.selectedImages">Selected Images</h4>
                <div id="selectedImagesPreview"></div>
                <p class="selected-count" id="selectedCountMsg" data-i18n="codeAddition.selectedCount">Selected: 0 / 5</p>
              </div>
            </div>

            <!-- Worksheet Content -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="worksheetContent">
                <span data-i18n="codeAddition.worksheetContent">Worksheet Content</span>
              </button>
              <div class="accordion-content">
                <label for="worksheetThemeSelect" data-i18n="codeAddition.generationMethod">Generation Method:</label>
                <select id="worksheetThemeSelect">
                  <option value="use_selected" data-i18n="codeAddition.useSelected">Use Manually Selected Images</option>
                </select>

                <label for="exerciseCount" data-i18n="codeAddition.exerciseCount">Number of Exercises:</label>
                <input type="number" id="exerciseCount" value="5" min="3" max="10">

                <p style="font-size: 12px; color: var(--app-text-secondary-dark-theme); margin-top: 8px;" data-i18n="codeAddition.exerciseHelp">
                  Select a theme to randomly generate problems each time you click 'Generate'. Or, use the Image Library to pick specific images.
                </p>
              </div>
            </div>

            <!-- Optional Settings -->
            <div class="accordion-item">
              <button class="accordion-button" data-section="optionalSettings">
                <span data-i18n="codeAddition.optionalSettings">Optional Settings</span>
              </button>
              <div class="accordion-content">
                <label for="includeNameDate" class="checkbox-label">
                  <input type="checkbox" id="includeNameDate">
                  <span data-i18n="codeAddition.includeNameDate">Include Name/Date Fields</span>
                </label>
                <label for="includeExerciseNumbers" class="checkbox-label">
                  <input type="checkbox" id="includeExerciseNumbers">
                  <span data-i18n="codeAddition.includeNumbers">Show numbers for each problem</span>
                </label>
              </div>
            </div>

          </div>
          <div class="panel-footer">
            <div id="message"></div>
          </div>
        </div>

        <main class="main">
          <div class="top-right-actions">
            <div class="dropdown-container">
              <button id="generateDropdownBtn" class="action-button accent">
                <span data-i18n="codeAddition.generate">Generate</span>
                <span>▼</span>
              </button>
              <div id="generateDropdownContent" class="dropdown-content">
                <button id="generateWorksheetBtn" data-i18n="codeAddition.generateWorksheet">Generate Worksheet</button>
                <button id="generateAnswerKeyBtn" data-i18n="codeAddition.generateAnswerKey" disabled>Generate Answer Key</button>
              </div>
            </div>
            
            <div class="dropdown-container">
              <button id="downloadDropdownBtn" class="action-button secondary" disabled>
                <span data-i18n="codeAddition.download">Download</span>
                <span>▼</span>
              </button>
              <div id="downloadDropdownContent" class="dropdown-content">
                <button id="downloadWsJpegBtn" data-i18n="codeAddition.worksheetJpeg" disabled>Worksheet (JPEG)</button>
                <button id="downloadAkJpegBtn" data-i18n="codeAddition.answerKeyJpeg" disabled>Answer Key (JPEG)</button>
                <button id="downloadWsPdfBtn" data-i18n="codeAddition.worksheetPdf" disabled>Worksheet (PDF)</button>
                <button id="downloadAkPdfBtn" data-i18n="codeAddition.answerKeyPdf" disabled>Answer Key (PDF)</button>
                <label class="checkbox-label">
                  <input type="checkbox" id="grayscaleToggle">
                  <span data-i18n="codeAddition.grayscale">Grayscale</span>
                </label>
              </div>
            </div>
            
            <button id="printBtn" class="action-button secondary" disabled>
              <span data-i18n="codeAddition.print">Print</span>
            </button>
            
            <button id="clearBtn" class="action-button danger">
              <span data-i18n="codeAddition.clearAll">Clear All</span>
            </button>
          </div>

          <div class="tab-row">
            <button class="tab-button active" data-tab="worksheetTab">
              <span data-i18n="codeAddition.worksheet">Worksheet</span>
            </button>
            <button class="tab-button" data-tab="answerKeyTab">
              <span data-i18n="codeAddition.answerKey">Answer Key</span>
            </button>
          </div>

          <div class="tab-content-wrapper">
            <div class="tab active" id="worksheetTab">
              <div class="canvas-container-wrapper">
                <canvas id="worksheetCanvas"></canvas>
              </div>
            </div>
            <div class="tab" id="answerKeyTab">
              <div class="canvas-container-wrapper">
                <canvas id="answerKeyCanvas"></canvas>
              </div>
            </div>
          </div>
        </main>
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
    const answerKeyCanvas = this.shadowRoot.getElementById('answerKeyCanvas');

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

    // Group images by theme for theme selectors
    const themes = [...new Set(this._images.map(img => img.theme).filter(Boolean))];
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    const worksheetThemeSelect = this.shadowRoot.getElementById('worksheetThemeSelect');
    
    themeSelect.innerHTML = '<option value="">All Themes</option>';
    worksheetThemeSelect.innerHTML = '<option value="use_selected">Use Manually Selected Images</option>';
    
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
      item.className = 'thumbnail-item';
      item.innerHTML = `
        <div class="thumbnail-image-container">
          <img src="${image.url}" alt="${image.displayName}">
        </div>
        <div class="thumbnail-text">${image.displayName}</div>
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
    if (this.selectedImages.length >= 5 && !element.classList.contains('selected')) {
      this.showMessage('Maximum 5 images can be selected.', 'error');
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
      item.className = 'thumbnail-item selected';
      item.innerHTML = `
        <div class="thumbnail-image-container">
          <img src="${image.url}" alt="${image.displayName}">
        </div>
        <div class="thumbnail-text">${image.displayName}</div>
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
    const items = dictionary.querySelectorAll('.thumbnail-item');
    items.forEach(item => {
      const img = item.querySelector('img');
      const isSelected = this.selectedImages.some(selected => selected.url === img.src);
      item.classList.toggle('selected', isSelected);
    });
  }

  updateSelectedCount() {
    const selectedCountMsg = this.shadowRoot.getElementById('selectedCountMsg');
    const count = this.selectedImages.length;
    selectedCountMsg.textContent = this.getTranslation('codeAddition.selectedCount').replace('{count}', count);
  }

  async generateWorksheet() {
    const worksheetTheme = this.shadowRoot.getElementById('worksheetThemeSelect').value;
    const exerciseCount = parseInt(this.shadowRoot.getElementById('exerciseCount').value);
    
    // Determine images to use
    let imagesToUse = [];
    if (worksheetTheme === 'use_selected') {
      if (this.selectedImages.length < 2) {
        this.showMessage(this.getTranslation('codeAddition.noImagesError'), 'error');
        return;
      }
      imagesToUse = this.selectedImages;
    } else if (worksheetTheme) {
      // Use theme-based images
      const themeImages = this._images.filter(img => img.theme === worksheetTheme);
      imagesToUse = this.getRandomItems(themeImages, Math.max(exerciseCount * 2, 10));
    } else {
      this.showMessage(this.getTranslation('codeAddition.noImagesError'), 'error');
      return;
    }

    if (imagesToUse.length < 2) {
      this.showMessage(this.getTranslation('codeAddition.noImagesError'), 'error');
      return;
    }

    this.showMessage(this.getTranslation('codeAddition.generating'));
    
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
      
      // Generate addition exercises
      await this.generateAdditionExercises(imagesToUse, exerciseCount);
      
      // Enable answer key and download buttons
      this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = false;
      this.shadowRoot.getElementById('downloadDropdownBtn').disabled = false;
      this.shadowRoot.getElementById('printBtn').disabled = false;
      this.enableDownloadButtons(true);
      
      this.showMessage('Addition worksheet generated successfully!', 'success');
      
      // Emit worksheet generated event
      this.emit('worksheet-generated', {
        type: 'code-addition',
        images: imagesToUse.map(img => img.displayName),
        exercises: this.currentExercises
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
      width = parseInt(this.shadowRoot.getElementById('pageWidth').value) || 612;
      height = parseInt(this.shadowRoot.getElementById('pageHeight').value) || 792;
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

  async generateAdditionExercises(images, exerciseCount) {
    this.currentExercises = [];
    const startY = this.shadowRoot.getElementById('includeNameDate').checked ? 80 : 50;
    const exerciseHeight = Math.floor((this.worksheetCanvas.height - startY - 50) / exerciseCount);
    const includeNumbers = this.shadowRoot.getElementById('includeExerciseNumbers').checked;
    
    // Add title
    const title = new fabric.Text('Addition Practice', {
      left: this.worksheetCanvas.width / 2,
      top: startY,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000',
      originX: 'center',
      fontWeight: 'bold'
    });
    
    this.worksheetCanvas.add(title);
    this.answerKeyCanvas.add(title.clone());

    const exercisesStartY = startY + 40;

    for (let i = 0; i < exerciseCount; i++) {
      const exercise = await this.createAdditionExercise(
        images, 
        i, 
        exercisesStartY + i * exerciseHeight,
        exerciseHeight,
        includeNumbers
      );
      this.currentExercises.push(exercise);
    }

    this.worksheetCanvas.renderAll();
    this.answerKeyCanvas.renderAll();
  }

  async createAdditionExercise(images, exerciseIndex, yPosition, exerciseHeight, includeNumbers) {
    const exercise = {
      index: exerciseIndex,
      addend1: 0,
      addend2: 0,
      sum: 0,
      image1: null,
      image2: null,
      yPosition
    };

    // Add exercise number if enabled
    if (includeNumbers) {
      const numberText = new fabric.Text(`${exerciseIndex + 1}.`, {
        left: 30,
        top: yPosition + 10,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: '#000000',
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(numberText);
      this.answerKeyCanvas.add(numberText.clone());
    }

    // Select random quantities (1-9)
    exercise.addend1 = Math.floor(Math.random() * 5) + 1; // 1-5
    exercise.addend2 = Math.floor(Math.random() * 5) + 1; // 1-5
    exercise.sum = exercise.addend1 + exercise.addend2;

    // Select two random images
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    exercise.image1 = shuffledImages[0];
    exercise.image2 = shuffledImages[1] || shuffledImages[0];

    const xStart = includeNumbers ? 80 : 50;
    const imageSize = Math.min(40, exerciseHeight / 3);
    
    try {
      // Create first group of images
      await this.createImageGroup(
        exercise.image1, 
        exercise.addend1, 
        xStart, 
        yPosition + 10, 
        imageSize
      );
      
      // Add plus sign
      const plusText = new fabric.Text('+', {
        left: xStart + exercise.addend1 * (imageSize + 5) + 20,
        top: yPosition + imageSize / 2,
        fontSize: 24,
        fontFamily: 'Arial',
        fill: '#000000',
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(plusText);
      this.answerKeyCanvas.add(plusText.clone());

      // Create second group of images
      await this.createImageGroup(
        exercise.image2,
        exercise.addend2,
        xStart + exercise.addend1 * (imageSize + 5) + 60,
        yPosition + 10,
        imageSize
      );

      // Add equals sign
      const equalsText = new fabric.Text('=', {
        left: xStart + (exercise.addend1 + exercise.addend2) * (imageSize + 5) + 100,
        top: yPosition + imageSize / 2,
        fontSize: 24,
        fontFamily: 'Arial',
        fill: '#000000',
        fontWeight: 'bold'
      });
      this.worksheetCanvas.add(equalsText);
      this.answerKeyCanvas.add(equalsText.clone());

      // Add answer box on worksheet (empty)
      const answerBox = new fabric.Rect({
        left: xStart + (exercise.addend1 + exercise.addend2) * (imageSize + 5) + 140,
        top: yPosition + imageSize / 2 - 15,
        width: 40,
        height: 30,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        selectable: false
      });
      this.worksheetCanvas.add(answerBox);

      // Add answer on answer key
      const answerText = new fabric.Text(exercise.sum.toString(), {
        left: xStart + (exercise.addend1 + exercise.addend2) * (imageSize + 5) + 160,
        top: yPosition + imageSize / 2 - 8,
        fontSize: 18,
        fontFamily: 'Arial',
        fill: '#ff0000',
        fontWeight: 'bold',
        originX: 'center'
      });
      this.answerKeyCanvas.add(answerBox.clone(), answerText);

    } catch (error) {
      console.error('Error creating exercise:', error);
      // Add text-based fallback
      const fallbackText = new fabric.Text(
        `${exercise.addend1} + ${exercise.addend2} = ___`,
        {
          left: xStart,
          top: yPosition + 20,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: '#000000'
        }
      );
      this.worksheetCanvas.add(fallbackText);
      
      const fallbackAnswer = fallbackText.clone();
      fallbackAnswer.set('text', `${exercise.addend1} + ${exercise.addend2} = ${exercise.sum}`);
      this.answerKeyCanvas.add(fallbackAnswer);
    }

    return exercise;
  }

  async createImageGroup(imageData, count, startX, startY, imageSize) {
    const spacing = 5;
    
    for (let i = 0; i < count; i++) {
      try {
        const fabricImage = await this.createFabricImage(
          imageData.url,
          imageSize,
          startX + i * (imageSize + spacing),
          startY
        );
        this.worksheetCanvas.add(fabricImage);
        this.answerKeyCanvas.add(fabricImage.clone());
      } catch (error) {
        console.error('Error creating image:', error);
        // Fallback to colored circles
        const circle = new fabric.Circle({
          left: startX + i * (imageSize + spacing),
          top: startY,
          radius: imageSize / 2,
          fill: this.getRandomColor(),
          stroke: '#000000',
          strokeWidth: 1,
          selectable: false
        });
        this.worksheetCanvas.add(circle);
        this.answerKeyCanvas.add(circle.clone());
      }
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

  getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    return colors[Math.floor(Math.random() * colors.length)];
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
    this.shadowRoot.getElementById('imageUpload').addEventListener('change', (e) => {
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
    this.shadowRoot.getElementById('generateAnswerKeyBtn').addEventListener('click', () => {
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

    // Print button
    this.shadowRoot.getElementById('printBtn').addEventListener('click', () => {
      this.printWorksheet();
    });

    // Clear all
    this.shadowRoot.getElementById('clearBtn').addEventListener('click', () => {
      this.clearAll();
    });
  }

  handleFileUpload(files) {
    const userGallery = this.shadowRoot.getElementById('userImageGallery');
    
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
          
          // Add to user gallery
          const item = document.createElement('div');
          item.className = 'thumbnail-item';
          item.innerHTML = `
            <div class="thumbnail-image-container">
              <img src="${imageData.url}" alt="${imageData.displayName}">
            </div>
            <div class="thumbnail-text">${imageData.displayName}</div>
          `;
          item.addEventListener('click', () => this.toggleImageSelection(imageData, item));
          userGallery.appendChild(item);
          
          userGallery.style.display = 'grid';
          
          // Auto-select if not at limit
          if (this.selectedImages.length < 5) {
            this.toggleImageSelection(imageData, item);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  applyPageSize() {
    const select = this.shadowRoot.getElementById('pageSizeSelect');
    let width, height;

    if (select.value === 'custom') {
      width = parseInt(this.shadowRoot.getElementById('pageWidth').value) || 612;
      height = parseInt(this.shadowRoot.getElementById('pageHeight').value) || 792;
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
      link.download = 'addition-worksheet.jpg';
      link.href = this.worksheetCanvas.toDataURL('image/jpeg');
    } else {
      link.download = 'addition-worksheet.png';
      link.href = this.worksheetCanvas.toDataURL();
    }
    link.click();
    this.showMessage('Worksheet downloaded!', 'success');
  }

  downloadAnswerKey(format) {
    const link = document.createElement('a');
    if (format === 'jpeg') {
      link.download = 'addition-answer-key.jpg';
      link.href = this.answerKeyCanvas.toDataURL('image/jpeg');
    } else {
      link.download = 'addition-answer-key.png';
      link.href = this.answerKeyCanvas.toDataURL();
    }
    link.click();
    this.showMessage('Answer key downloaded!', 'success');
  }

  printWorksheet() {
    const printWindow = window.open('', '_blank');
    const canvasData = this.worksheetCanvas.toDataURL();
    printWindow.document.write(`
      <html>
        <head><title>Print Worksheet</title></head>
        <body style="margin:0;padding:20px;">
          <img src="${canvasData}" style="max-width:100%;height:auto;">
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  clearAll() {
    if (confirm('Are you sure you want to clear everything?')) {
      this.worksheetCanvas?.clear();
      this.answerKeyCanvas?.clear();
      this.selectedImages = [];
      this.uploadedImages = [];
      this.currentExercises = [];
      
      this.updateSelectedImagesPreview();
      this.updateSelectedCount();
      
      // Clear uploaded images gallery
      const userGallery = this.shadowRoot.getElementById('userImageGallery');
      userGallery.innerHTML = '';
      userGallery.style.display = 'none';
      
      // Reset UI
      this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = true;
      this.shadowRoot.getElementById('downloadDropdownBtn').disabled = true;
      this.shadowRoot.getElementById('printBtn').disabled = true;
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

customElements.define('lcs-code-addition', CodeAdditionGenerator);