import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class PatternWorksheetGenerator extends BaseWebComponent {
    get appName() { return 'pattern-worksheet'; }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>
            <div class="layout">
                ${this.getHTML()}
            </div>
        `;
    }

    getStyles() {
        return `
            :host {
                display: block;
                width: 100%;
                height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            .layout {
                display: flex;
                height: 100vh;
                background: #f0f2f5;
                overflow: hidden;
            }
            
            /* Sidebar Panel */
            .panel {
                width: 340px;
                min-width: 340px;
                background: #2c2c2e;
                color: #e0e0e0;
                box-shadow: 2px 0 8px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                overflow-y: hidden;
                z-index: 10;
            }
            
            .panel-header {
                padding: 20px 25px;
                border-bottom: 1px solid #4a4a4a;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .panel-header h2 {
                font-size: 22px;
                font-weight: 600;
                color: #e0e0e0;
                margin: 0;
            }
            
            .panel-content {
                overflow-y: auto;
                flex-grow: 1;
                padding: 10px 15px;
            }
            
            /* Language Selector */
            .language-selector {
                padding: 10px 15px;
                border-bottom: 1px solid #4a4a4a;
                background: #3a3a3e;
            }
            
            .language-selector label {
                display: block;
                font-size: 12px;
                margin-bottom: 5px;
                color: #a0a0a0;
            }
            
            .language-selector select {
                width: 100%;
                padding: 8px;
                background: #2c2c2e;
                color: #e0e0e0;
                border: 1px solid #4a4a4a;
                border-radius: 4px;
                font-size: 14px;
            }
            
            /* Accordion Styles */
            .accordion-item {
                border-bottom: 1px solid #4a4a4a;
                margin-bottom: 0;
            }
            
            .accordion-button {
                width: 100%;
                background: transparent;
                color: #e0e0e0;
                border: none;
                padding: 15px;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background 0.2s;
            }
            
            .accordion-button:hover {
                background: #3a3a3e;
            }
            
            .accordion-button::after {
                content: '▼';
                font-size: 12px;
                transition: transform 0.3s;
            }
            
            .accordion-button.active::after {
                transform: rotate(180deg);
            }
            
            .accordion-content {
                display: none;
                padding: 15px;
                background: #3a3a3e;
            }
            
            .accordion-content.active {
                display: block;
            }
            
            /* Form Controls */
            .control-group {
                margin-bottom: 15px;
            }
            
            label {
                display: block;
                font-size: 12px;
                margin-bottom: 5px;
                color: #a0a0a0;
            }
            
            input[type="text"],
            input[type="number"],
            input[type="color"],
            input[type="range"],
            select {
                width: 100%;
                padding: 8px;
                background: #2c2c2e;
                color: #e0e0e0;
                border: 1px solid #4a4a4a;
                border-radius: 4px;
                font-size: 14px;
            }
            
            button {
                width: 100%;
                padding: 10px;
                background: #007aff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s;
            }
            
            button:hover:not(:disabled) {
                background: #005ecb;
            }
            
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                margin: 10px 0;
                cursor: pointer;
            }
            
            .checkbox-label input {
                width: auto;
                margin-right: 8px;
            }
            
            /* Main Content Area */
            .main {
                flex: 1;
                display: flex;
                flex-direction: column;
                position: relative;
                background: #f0f2f5;
            }
            
            /* Top Actions Bar */
            .top-right-actions {
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                z-index: 5;
            }
            
            .action-button {
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: 500;
                min-width: 120px;
            }
            
            .action-button.accent {
                background: #007aff;
            }
            
            .action-button.secondary {
                background: #545458;
            }
            
            .action-button.danger {
                background: #ff3b30;
            }
            
            /* Tab System */
            .tab-row {
                display: flex;
                background: white;
                border-bottom: 1px solid #dce1e6;
                padding: 0 20px;
                margin-top: 80px;
            }
            
            .tab-button {
                padding: 15px 30px;
                background: transparent;
                border: none;
                border-bottom: 3px solid transparent;
                color: #545458;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
            }
            
            .tab-button.active {
                color: #007aff;
                border-bottom-color: #007aff;
            }
            
            .tab-content-wrapper {
                flex: 1;
                background: white;
                padding: 20px;
                overflow: auto;
            }
            
            .tab {
                display: none;
                width: 100%;
                height: 100%;
            }
            
            .tab.active {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            /* Canvas Container */
            .canvas-container-wrapper {
                overflow: visible !important;
                position: relative;
                margin: 20px auto;
            }
            
            .canvas-container {
                overflow: visible !important;
                position: relative !important;
                margin: 0 auto;
            }
            
            canvas {
                border: 1px solid #dce1e6;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                background: white;
            }
            
            /* Image Dictionary */
            #dictionary, #assignedImages, #uploadedImagesPreview {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 10px;
                max-height: 300px;
                overflow-y: auto;
                padding: 10px;
                background: #2c2c2e;
                border: 1px solid #4a4a4a;
                border-radius: 4px;
                margin-top: 10px;
            }
            
            .dict-item, .assigned-item {
                text-align: center;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.2s;
                background: #3a3a3e;
            }
            
            .dict-item:hover, .assigned-item:hover {
                background: #4a4a4a;
                transform: scale(1.05);
            }
            
            .dict-item img, .assigned-item img {
                width: 60px;
                height: 60px;
                object-fit: contain;
                margin-bottom: 2px;
            }
            
            .dict-item span, .assigned-item span {
                display: block;
                font-size: 10px;
                color: #a0a0a0;
                word-break: break-word;
            }
            
            .assigned-item {
                position: relative;
            }
            
            .assigned-item .remove-btn {
                position: absolute;
                top: 2px;
                right: 2px;
                background: #ff3b30;
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                cursor: pointer;
                display: none;
            }
            
            .assigned-item:hover .remove-btn {
                display: block;
            }
            
            .dictionary-message {
                grid-column: 1 / -1;
                text-align: center;
                color: #a0a0a0;
                font-size: 12px;
                padding: 20px;
            }
            
            /* Dropdown Menus */
            .dropdown-container {
                position: relative;
                display: inline-block;
            }
            
            .dropdown-content {
                display: none;
                position: absolute;
                right: 0;
                background-color: white;
                min-width: 200px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                border-radius: 5px;
                z-index: 1000;
                padding: 10px;
                margin-top: 5px;
            }
            
            .dropdown-content.show {
                display: block;
            }
            
            .dropdown-content button {
                width: 100%;
                margin: 5px 0;
                text-align: left;
                padding: 8px 12px;
            }
            
            /* Context Toolbar */
            #object-context-toolbar {
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                display: flex;
                gap: 10px;
                z-index: 100;
            }
            
            .context-btn {
                width: 36px;
                height: 36px;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f0f2f5;
                color: #545458;
                border: 1px solid #dce1e6;
                border-radius: 4px;
            }
            
            .context-btn:hover {
                background: #e0e2e5;
            }
            
            .toolbar-group {
                display: flex;
                gap: 5px;
            }
            
            .toolbar-item {
                position: relative;
            }
            
            /* Message Display */
            #message {
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #a0a0a0;
            }
            
            #message.success {
                color: #4caf50;
            }
            
            #message.error {
                color: #ff3b30;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .panel {
                    position: fixed;
                    left: -340px;
                    height: 100vh;
                    transition: left 0.3s;
                    z-index: 1000;
                }
                
                .panel.open {
                    left: 0;
                }
                
                .menu-toggle-btn {
                    display: block;
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    z-index: 5;
                    background: white;
                    border: 1px solid #dce1e6;
                    border-radius: 5px;
                    padding: 10px;
                    cursor: pointer;
                }
            }
            
            @media (min-width: 769px) {
                .menu-toggle-btn {
                    display: none;
                }
            }
        `;
    }

    getHTML() {
        return `
            <!-- Sidebar Panel -->
            <div class="panel">
                <div class="panel-header">
                    <h2 data-translate-key="appTitle">Pattern Worksheet</h2>
                </div>
                
                <!-- Language Selector -->
                <div class="language-selector">
                    <label data-translate-key="language">Language:</label>
                    <select id="languageSelect">
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="pt">Português</option>
                        <option value="it">Italiano</option>
                        <option value="nl">Nederlands</option>
                        <option value="sv">Svenska</option>
                        <option value="da">Dansk</option>
                        <option value="no">Norsk</option>
                        <option value="fi">Suomi</option>
                    </select>
                </div>
                
                <div class="panel-content">
                    <!-- Page Settings -->
                    <div class="accordion-item">
                        <button class="accordion-button active" data-translate-key="pageSettings">Page Settings</button>
                        <div class="accordion-content active">
                            <div class="control-group">
                                <label data-translate-key="pageSize">Page Size:</label>
                                <select id="pageSizeSelect">
                                    <option value="612x792">Letter Portrait (612×792)</option>
                                    <option value="792x612">Letter Landscape (792×612)</option>
                                    <option value="595x842">A4 Portrait (595×842)</option>
                                    <option value="842x595">A4 Landscape (842×595)</option>
                                    <option value="1200x1200">Square (1200×1200)</option>
                                    <option value="custom">Custom</option>
                                </select>
                                <div id="customSizeInputs" style="display: none; margin-top: 10px;">
                                    <input type="number" id="customWidth" placeholder="Width" min="100" max="2000" style="width: 48%; margin-right: 4%;">
                                    <input type="number" id="customHeight" placeholder="Height" min="100" max="2000" style="width: 48%;">
                                </div>
                            </div>
                            <div class="control-group">
                                <label data-translate-key="title">Title:</label>
                                <input type="text" id="titleInput" placeholder="Complete the Pattern">
                            </div>
                            <div class="control-group">
                                <label data-translate-key="instructions">Instructions:</label>
                                <input type="text" id="instructionsInput" placeholder="Look at the pattern and fill in the missing element">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pattern Settings -->
                    <div class="accordion-item">
                        <button class="accordion-button" data-translate-key="patternSettings">Pattern Settings</button>
                        <div class="accordion-content">
                            <div class="control-group">
                                <label data-translate-key="numberOfExercises">Number of Exercises (1-8):</label>
                                <input type="number" id="exerciseCount" value="3" min="1" max="8">
                            </div>
                            <div class="control-group">
                                <label data-translate-key="worksheetTheme">Overall Worksheet Theme:</label>
                                <select id="worksheetThemeSelect">
                                    <option value="none">None (Use individual settings)</option>
                                </select>
                            </div>
                            <div class="control-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="useWorksheetThemeCheckbox">
                                    <span data-translate-key="useOverallTheme">Use Overall Worksheet Theme</span>
                                </label>
                            </div>
                            <div class="control-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="includeNumbersCheckbox" checked>
                                    <span data-translate-key="includePuzzleNumbers">Include Puzzle Numbers</span>
                                </label>
                            </div>
                            <div class="control-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="randomStartCheckbox">
                                    <span data-translate-key="startFromRandom">Start from random element</span>
                                </label>
                            </div>
                            
                            <h4 data-translate-key="individualPuzzleSettings" style="margin-top: 20px; margin-bottom: 10px;">Individual Puzzle Settings</h4>
                            <div class="control-group">
                                <label data-translate-key="configurePuzzle">Configure Puzzle:</label>
                                <select id="configurePuzzleSelect"></select>
                            </div>
                            <div class="control-group">
                                <label data-translate-key="patternType">Pattern Type:</label>
                                <select id="patternSelect">
                                    <option value="AB">AB (2 images)</option>
                                    <option value="AAB">AAB (2 images)</option>
                                    <option value="ABB">ABB (2 images)</option>
                                    <option value="ABC">ABC (3 images)</option>
                                    <option value="AABB">AABB (2 images)</option>
                                    <option value="ABBC">ABBC (3 images)</option>
                                    <option value="AABC">AABC (3 images)</option>
                                    <option value="ABCC">ABCC (3 images)</option>
                                    <option value="ABCD">ABCD (4 images)</option>
                                </select>
                            </div>
                            <div class="control-group">
                                <label data-translate-key="questionType">Question Type:</label>
                                <select id="questionTypeSelect">
                                    <option value="blank">Blank Box</option>
                                    <option value="options">Choose from Options</option>
                                </select>
                            </div>
                            <div class="control-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="randomBlankCheckbox">
                                    <span data-translate-key="randomBlankPosition">Random blank box position</span>
                                </label>
                            </div>
                            
                            <h4 data-translate-key="imagesForPuzzle" style="margin-top: 20px; margin-bottom: 10px;">Images for Selected Puzzle</h4>
                            <div class="control-group">
                                <label data-translate-key="imageTheme">Image Theme:</label>
                                <select id="themeSelect"></select>
                            </div>
                            <div class="control-group">
                                <label data-translate-key="assignedImages">Assigned Images:</label>
                                <div id="assignedImages"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Image Library -->
                    <div class="accordion-item">
                        <button class="accordion-button" data-translate-key="imageLibrary">Image Library</button>
                        <div class="accordion-content">
                            <div class="control-group">
                                <label data-translate-key="searchImages">Search Images:</label>
                                <input type="text" id="searchInput" placeholder="e.g., apple, car">
                            </div>
                            <div class="control-group">
                                <label data-translate-key="availableImages">Available Images (Click to assign):</label>
                                <div id="dictionary">
                                    <p class="dictionary-message" data-translate-key="selectThemeMessage">Select a theme to see images.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Upload Custom Images -->
                    <div class="accordion-item">
                        <button class="accordion-button" data-translate-key="uploadCustomImages">Upload Custom Images</button>
                        <div class="accordion-content">
                            <div class="control-group">
                                <label data-translate-key="selectImages">Select image(s) to upload:</label>
                                <input type="file" id="imageUploadInput" multiple accept="image/*">
                            </div>
                            <div class="control-group">
                                <label data-translate-key="uploadedImages">Your Uploaded Images:</label>
                                <div id="uploadedImagesPreview">
                                    <p class="dictionary-message" data-translate-key="uploadedImagesMessage">Your uploaded images will appear here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="panel-footer">
                    <div id="message"></div>
                </div>
            </div>
            
            <!-- Main Content Area -->
            <div class="main">
                <button id="menuToggleBtn" class="menu-toggle-btn">☰</button>
                
                <!-- Object Context Toolbar -->
                <div id="object-context-toolbar" style="display:none;">
                    <div class="toolbar-group">
                        <div class="toolbar-item">
                            <button class="context-btn" id="layersBtn" title="Layers">⬆</button>
                        </div>
                    </div>
                    <div class="toolbar-group">
                        <div class="toolbar-item">
                            <button class="context-btn" id="alignBtn" title="Align">⚏</button>
                        </div>
                    </div>
                    <div class="toolbar-group">
                        <button class="context-btn" id="toolbarDeleteBtn" title="Delete">🗑</button>
                    </div>
                </div>
                
                <!-- Top Actions -->
                <div class="top-right-actions">
                    <div class="dropdown-container">
                        <button id="generateDropdownBtn" class="action-button accent">
                            <span data-translate-key="generate">Generate</span> ▼
                        </button>
                        <div id="generateDropdownContent" class="dropdown-content">
                            <button id="generateWorksheetBtn" data-translate-key="generateWorksheet">Generate Worksheet</button>
                            <button id="generateAnswerKeyBtn" data-translate-key="generateAnswerKey" disabled>Generate Answer Key</button>
                        </div>
                    </div>
                    <div class="dropdown-container">
                        <button id="downloadDropdownBtn" class="action-button secondary" disabled>
                            <span data-translate-key="download">Download</span> ▼
                        </button>
                        <div id="downloadDropdownContent" class="dropdown-content">
                            <button id="downloadWsJpegBtn" data-translate-key="downloadWorksheetJpeg">Worksheet (JPEG)</button>
                            <button id="downloadAkJpegBtn" data-translate-key="downloadAnswerKeyJpeg" disabled>Answer Key (JPEG)</button>
                            <button id="downloadWsPdfBtn" data-translate-key="downloadWorksheetPdf">Worksheet (PDF)</button>
                            <button id="downloadAkPdfBtn" data-translate-key="downloadAnswerKeyPdf" disabled>Answer Key (PDF)</button>
                            <label class="checkbox-label">
                                <input type="checkbox" id="grayscaleToggle">
                                <span data-translate-key="grayscale">Grayscale</span>
                            </label>
                        </div>
                    </div>
                    <button id="clearBtn" class="action-button danger" data-translate-key="clearAll">Clear All</button>
                </div>
                
                <!-- Tab System -->
                <div class="tab-row">
                    <button class="tab-button active" data-tab="worksheetTab" data-translate-key="worksheet">Worksheet</button>
                    <button class="tab-button" data-tab="answerKeyTab" data-translate-key="answerKey">Answer Key</button>
                </div>
                <div class="tab-content-wrapper">
                    <div class="tab active" id="worksheetTab">
                        <div class="canvas-container-wrapper" id="worksheetCanvasWrapper">
                            <canvas id="worksheetCanvasElement"></canvas>
                        </div>
                    </div>
                    <div class="tab" id="answerKeyTab">
                        <div class="canvas-container-wrapper" id="answerKeyCanvasWrapper">
                            <canvas id="answerKeyCanvasElement"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async connectedCallback() {
        await this.loadDependencies();
        super.connectedCallback();
    }

    async loadDependencies() {
        // Load Fabric.js
        if (typeof fabric === 'undefined') {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
        }
        
        // Load jsPDF
        if (typeof window.jspdf === 'undefined') {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        }
        
        // Load translations
        if (typeof window.translations === 'undefined') {
            await this.loadScript('/js/translations.js');
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

    setupEventListeners() {
        // Initialize variables at global scope
        this.currentLocale = 'en';
        this.currentCanvasConfig = { width: 612, height: 792 };
        
        // Check for locale in URL
        const urlParams = new URLSearchParams(window.location.search);
        const localeParam = urlParams.get('locale');
        if (localeParam) {
            this.currentLocale = localeParam;
        }
        
        // Initialize canvases
        this.initializeCanvases();
        
        // Setup language selector
        this.setupLanguageSelector();
        
        // Setup page size selector
        this.setupPageSizeSelector();
        
        // Setup accordion functionality
        this.setupAccordions();
        
        // Setup pattern controls
        this.setupPatternControls();
        
        // Setup image library
        this.setupImageLibrary();
        
        // Setup action buttons
        this.setupActionButtons();
        
        // Setup tab system
        this.setupTabSystem();
        
        // Setup canvas event handlers
        this.setupCanvasEvents();
        
        // Load initial themes
        this.loadThemes();
        
        // Apply initial translations
        if (typeof applyTranslations !== 'undefined') {
            applyTranslations();
        }
    }

    initializeCanvases() {
        const worksheetEl = this.shadowRoot.getElementById('worksheetCanvasElement');
        const answerKeyEl = this.shadowRoot.getElementById('answerKeyCanvasElement');
        
        this.worksheetCanvas = new fabric.Canvas(worksheetEl, {
            backgroundColor: '#FFFFFF',
            preserveObjectStacking: true,
            enableRetinaScaling: true
        });
        
        this.answerKeyCanvas = new fabric.Canvas(answerKeyEl, {
            backgroundColor: '#FFFFFF',
            preserveObjectStacking: true,
            enableRetinaScaling: true
        });
        
        // Set initial display dimensions
        this.updateCanvasDisplayDimensions(this.currentCanvasConfig.width, this.currentCanvasConfig.height);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateCanvasDisplayDimensions(this.currentCanvasConfig.width, this.currentCanvasConfig.height);
        });
    }

    updateCanvasDisplayDimensions(width, height) {
        this.currentCanvasConfig.width = width;
        this.currentCanvasConfig.height = height;
        
        // Use tab's parent element for available space
        const tabContent = this.shadowRoot.querySelector('.tab-content-wrapper');
        if (!tabContent) return;
        
        const mainStyle = getComputedStyle(tabContent);
        const availableWidth = parseFloat(mainStyle.width) - parseFloat(mainStyle.paddingLeft) - parseFloat(mainStyle.paddingRight) - 50;
        const availableHeight = parseFloat(mainStyle.height) - parseFloat(mainStyle.paddingTop) - parseFloat(mainStyle.paddingBottom) - 50;
        
        // Apply 25% scaling for better visibility
        const isLandscape = width > height;
        const baseScale = 1.25;
        const landscapeBonus = isLandscape ? 1.25 : 1.0;
        const displayScale = baseScale * landscapeBonus;
        
        const scaledWidth = width * displayScale;
        const scaledHeight = height * displayScale;
        
        const scaleRatio = Math.min(availableWidth / scaledWidth, availableHeight / scaledHeight, 1);
        const displayWidth = scaledWidth * scaleRatio;
        const displayHeight = scaledHeight * scaleRatio;
        
        [this.worksheetCanvas, this.answerKeyCanvas].forEach(canvas => {
            if (canvas) {
                const finalZoom = displayWidth / width;
                canvas.setZoom(finalZoom);
                canvas.setDimensions({
                    width: displayWidth,
                    height: displayHeight
                });
                canvas.renderAll();
            }
        });
        
        // Update wrapper dimensions
        const worksheetWrapper = this.shadowRoot.getElementById('worksheetCanvasWrapper');
        const answerKeyWrapper = this.shadowRoot.getElementById('answerKeyCanvasWrapper');
        
        [worksheetWrapper, answerKeyWrapper].forEach(wrapper => {
            if (wrapper) {
                wrapper.style.width = displayWidth + 'px';
                wrapper.style.height = displayHeight + 'px';
            }
        });
    }

    setupLanguageSelector() {
        const languageSelect = this.shadowRoot.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLocale;
            languageSelect.addEventListener('change', () => {
                this.currentLocale = languageSelect.value;
                if (typeof applyTranslations !== 'undefined') {
                    applyTranslations();
                }
                this.loadThemes();
                
                // Reload current theme images if any
                const themeSelect = this.shadowRoot.getElementById('themeSelect');
                if (themeSelect && themeSelect.value && themeSelect.value !== 'all') {
                    this.loadThemeImages(themeSelect.value);
                }
            });
        }
    }

    setupPageSizeSelector() {
        const pageSizeSelect = this.shadowRoot.getElementById('pageSizeSelect');
        const customSizeInputs = this.shadowRoot.getElementById('customSizeInputs');
        const customWidth = this.shadowRoot.getElementById('customWidth');
        const customHeight = this.shadowRoot.getElementById('customHeight');
        
        pageSizeSelect.addEventListener('change', () => {
            if (pageSizeSelect.value === 'custom') {
                customSizeInputs.style.display = 'block';
            } else {
                customSizeInputs.style.display = 'none';
                const [width, height] = pageSizeSelect.value.split('x').map(Number);
                this.updateCanvasDisplayDimensions(width, height);
            }
        });
        
        const updateCustomSize = () => {
            const width = parseInt(customWidth.value) || 612;
            const height = parseInt(customHeight.value) || 792;
            this.updateCanvasDisplayDimensions(width, height);
        };
        
        customWidth.addEventListener('change', updateCustomSize);
        customHeight.addEventListener('change', updateCustomSize);
    }

    setupAccordions() {
        const accordionButtons = this.shadowRoot.querySelectorAll('.accordion-button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                button.classList.toggle('active');
                content.classList.toggle('active');
            });
        });
    }

    setupPatternControls() {
        const exerciseCount = this.shadowRoot.getElementById('exerciseCount');
        const configurePuzzleSelect = this.shadowRoot.getElementById('configurePuzzleSelect');
        const patternSelect = this.shadowRoot.getElementById('patternSelect');
        const questionTypeSelect = this.shadowRoot.getElementById('questionTypeSelect');
        const themeSelect = this.shadowRoot.getElementById('themeSelect');
        const worksheetThemeSelect = this.shadowRoot.getElementById('worksheetThemeSelect');
        const useWorksheetThemeCheckbox = this.shadowRoot.getElementById('useWorksheetThemeCheckbox');
        
        // Initialize puzzle configurations
        this.puzzleConfigs = [];
        
        exerciseCount.addEventListener('change', () => {
            this.updatePuzzleConfigurations();
        });
        
        configurePuzzleSelect.addEventListener('change', () => {
            this.loadPuzzleConfiguration(parseInt(configurePuzzleSelect.value));
        });
        
        patternSelect.addEventListener('change', () => {
            this.savePuzzleConfiguration();
            this.updateRequiredImages();
        });
        
        questionTypeSelect.addEventListener('change', () => {
            this.savePuzzleConfiguration();
        });
        
        themeSelect.addEventListener('change', () => {
            this.loadThemeImages(themeSelect.value);
            this.savePuzzleConfiguration();
        });
        
        worksheetThemeSelect.addEventListener('change', () => {
            if (useWorksheetThemeCheckbox.checked && worksheetThemeSelect.value !== 'none') {
                this.applyWorksheetTheme(worksheetThemeSelect.value);
            }
        });
        
        useWorksheetThemeCheckbox.addEventListener('change', () => {
            if (useWorksheetThemeCheckbox.checked && worksheetThemeSelect.value !== 'none') {
                this.applyWorksheetTheme(worksheetThemeSelect.value);
            } else {
                this.clearWorksheetTheme();
            }
        });
        
        // Initialize configurations
        this.updatePuzzleConfigurations();
    }

    updatePuzzleConfigurations() {
        const count = parseInt(this.shadowRoot.getElementById('exerciseCount').value);
        const configurePuzzleSelect = this.shadowRoot.getElementById('configurePuzzleSelect');
        
        // Update puzzle configs array
        while (this.puzzleConfigs.length < count) {
            this.puzzleConfigs.push({
                pattern: 'AB',
                questionType: 'blank',
                theme: 'animals',
                images: []
            });
        }
        while (this.puzzleConfigs.length > count) {
            this.puzzleConfigs.pop();
        }
        
        // Update dropdown
        configurePuzzleSelect.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Puzzle ${i + 1}`;
            configurePuzzleSelect.appendChild(option);
        }
        
        // Load first puzzle configuration
        if (count > 0) {
            this.loadPuzzleConfiguration(0);
        }
    }

    loadPuzzleConfiguration(index) {
        if (index < 0 || index >= this.puzzleConfigs.length) return;
        
        const config = this.puzzleConfigs[index];
        this.currentPuzzleIndex = index;
        
        const patternSelect = this.shadowRoot.getElementById('patternSelect');
        const questionTypeSelect = this.shadowRoot.getElementById('questionTypeSelect');
        const themeSelect = this.shadowRoot.getElementById('themeSelect');
        
        patternSelect.value = config.pattern;
        questionTypeSelect.value = config.questionType;
        themeSelect.value = config.theme;
        
        // Load theme images
        if (config.theme && config.theme !== 'all') {
            this.loadThemeImages(config.theme);
        }
        
        // Display assigned images
        this.displayAssignedImages(config.images);
        this.updateRequiredImages();
    }

    savePuzzleConfiguration() {
        if (this.currentPuzzleIndex === undefined || 
            this.currentPuzzleIndex < 0 || 
            this.currentPuzzleIndex >= this.puzzleConfigs.length) return;
        
        const config = this.puzzleConfigs[this.currentPuzzleIndex];
        config.pattern = this.shadowRoot.getElementById('patternSelect').value;
        config.questionType = this.shadowRoot.getElementById('questionTypeSelect').value;
        config.theme = this.shadowRoot.getElementById('themeSelect').value;
    }

    updateRequiredImages() {
        const pattern = this.shadowRoot.getElementById('patternSelect').value;
        const uniqueLetters = new Set(pattern.split(''));
        const requiredCount = uniqueLetters.size;
        
        // Update UI to show required image count
        const assignedImages = this.shadowRoot.getElementById('assignedImages');
        if (assignedImages) {
            const currentCount = this.puzzleConfigs[this.currentPuzzleIndex]?.images?.length || 0;
            if (currentCount < requiredCount) {
                const message = document.createElement('p');
                message.className = 'dictionary-message';
                message.textContent = `Select ${requiredCount - currentCount} more image(s)`;
                assignedImages.insertBefore(message, assignedImages.firstChild);
            }
        }
    }

    displayAssignedImages(images) {
        const assignedImagesContainer = this.shadowRoot.getElementById('assignedImages');
        assignedImagesContainer.innerHTML = '';
        
        if (!images || images.length === 0) {
            assignedImagesContainer.innerHTML = '<p class="dictionary-message">No images assigned yet</p>';
            return;
        }
        
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'assigned-item';
            const displayName = img.name || img.word;
            item.innerHTML = `
                <img src="${img.path}" alt="${displayName}">
                <span>${displayName}</span>
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            
            const removeBtn = item.querySelector('.remove-btn');
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeAssignedImage(index);
            });
            
            assignedImagesContainer.appendChild(item);
        });
    }

    removeAssignedImage(index) {
        if (this.currentPuzzleIndex === undefined || 
            this.currentPuzzleIndex < 0 || 
            this.currentPuzzleIndex >= this.puzzleConfigs.length) return;
        
        const config = this.puzzleConfigs[this.currentPuzzleIndex];
        config.images.splice(index, 1);
        this.displayAssignedImages(config.images);
        this.updateRequiredImages();
    }

    applyWorksheetTheme(theme) {
        // Apply theme to all puzzle configurations
        this.puzzleConfigs.forEach(config => {
            config.theme = theme;
        });
        
        // Update current puzzle display
        if (this.currentPuzzleIndex !== undefined) {
            const themeSelect = this.shadowRoot.getElementById('themeSelect');
            themeSelect.value = theme;
            this.loadThemeImages(theme);
        }
    }

    clearWorksheetTheme() {
        // Allow individual puzzle themes
        const individualConfig = this.shadowRoot.getElementById('individualPuzzleConfigContainer');
        if (individualConfig) {
            individualConfig.style.display = 'block';
        }
    }

    setupImageLibrary() {
        const searchInput = this.shadowRoot.getElementById('searchInput');
        const imageUploadInput = this.shadowRoot.getElementById('imageUploadInput');
        
        searchInput.addEventListener('input', this.debounce(() => {
            this.searchImages(searchInput.value);
        }, 500));
        
        imageUploadInput.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });
        
        // Initialize uploaded images storage
        this.uploadedImages = [];
    }

    async loadThemes() {
        try {
            const response = await fetch(`/api/themes-translated?locale=${this.currentLocale}`);
            if (!response.ok) throw new Error('Failed to load themes');
            
            const themes = await response.json();
            
            // Update theme selects
            const themeSelect = this.shadowRoot.getElementById('themeSelect');
            const worksheetThemeSelect = this.shadowRoot.getElementById('worksheetThemeSelect');
            
            themeSelect.innerHTML = '<option value="all">All Themes</option>';
            worksheetThemeSelect.innerHTML = '<option value="none">None (Use individual settings)</option>';
            
            themes.forEach(theme => {
                const option1 = document.createElement('option');
                option1.value = theme.value || theme;
                option1.textContent = theme.displayName || theme;
                themeSelect.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = theme.value || theme;
                option2.textContent = theme.displayName || theme;
                worksheetThemeSelect.appendChild(option2);
            });
            
            // Load default theme
            this.loadThemeImages('animals');
            
        } catch (error) {
            console.error('Error loading themes:', error);
            this.showMessage('Failed to load themes', 'error');
        }
    }

    async loadThemeImages(theme) {
        try {
            const dictionary = this.shadowRoot.getElementById('dictionary');
            dictionary.innerHTML = '<p class="dictionary-message">Loading...</p>';
            
            let url;
            if (theme === 'all') {
                // Load animals by default when "All Themes" is selected
                url = `/api/images?theme=animals&locale=${this.currentLocale}`;
            } else {
                url = `/api/images?theme=${theme}&locale=${this.currentLocale}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load images');
            
            const data = await response.json();
            this.displayImages(data.images || data);
            
        } catch (error) {
            console.error('Error loading images:', error);
            this.showMessage('Failed to load images', 'error');
        }
    }

    async searchImages(query) {
        if (!query || query.trim() === '') {
            this.loadThemeImages(this.shadowRoot.getElementById('themeSelect').value);
            return;
        }
        
        try {
            const dictionary = this.shadowRoot.getElementById('dictionary');
            dictionary.innerHTML = '<p class="dictionary-message">Searching...</p>';
            
            const response = await fetch(`/api/images?search=${encodeURIComponent(query)}&locale=${this.currentLocale}`);
            if (!response.ok) throw new Error('Failed to search images');
            
            const data = await response.json();
            this.displayImages(data.images || data);
            
        } catch (error) {
            console.error('Error searching images:', error);
            this.showMessage('Failed to search images', 'error');
        }
    }

    displayImages(images) {
        const dictionary = this.shadowRoot.getElementById('dictionary');
        dictionary.innerHTML = '';
        
        if (!images || images.length === 0) {
            dictionary.innerHTML = '<p class="dictionary-message">No images found</p>';
            return;
        }
        
        // Load first 10 immediately, rest lazily
        const INITIAL_LOAD_COUNT = 10;
        const firstBatch = images.slice(0, INITIAL_LOAD_COUNT);
        const remainingBatch = images.slice(INITIAL_LOAD_COUNT);
        
        firstBatch.forEach(img => {
            this.createImageItem(img, dictionary);
        });
        
        if (remainingBatch.length > 0) {
            setTimeout(() => {
                remainingBatch.forEach(img => {
                    this.createImageItem(img, dictionary);
                });
            }, 100);
        }
    }

    createImageItem(imgData, container) {
        const item = document.createElement('div');
        item.className = 'dict-item';
        const displayName = imgData.name || imgData.word;
        
        item.innerHTML = `
            <img src="${imgData.path}" alt="${displayName}" loading="lazy" decoding="async">
            <span>${displayName}</span>
        `;
        
        item.addEventListener('click', () => {
            this.assignImageToPuzzle(imgData);
        });
        
        container.appendChild(item);
    }

    assignImageToPuzzle(imgData) {
        if (this.currentPuzzleIndex === undefined || 
            this.currentPuzzleIndex < 0 || 
            this.currentPuzzleIndex >= this.puzzleConfigs.length) {
            this.showMessage('Please select a puzzle first', 'error');
            return;
        }
        
        const config = this.puzzleConfigs[this.currentPuzzleIndex];
        const pattern = config.pattern;
        const uniqueLetters = new Set(pattern.split(''));
        const requiredCount = uniqueLetters.size;
        
        if (config.images.length >= requiredCount) {
            this.showMessage(`This puzzle already has all ${requiredCount} required images`, 'error');
            return;
        }
        
        // Check if image already assigned
        if (config.images.some(img => img.path === imgData.path)) {
            this.showMessage('This image is already assigned', 'error');
            return;
        }
        
        config.images.push(imgData);
        this.displayAssignedImages(config.images);
        this.updateRequiredImages();
        this.showMessage('Image assigned successfully', 'success');
    }

    handleImageUpload(files) {
        const uploadedImagesPreview = this.shadowRoot.getElementById('uploadedImagesPreview');
        uploadedImagesPreview.innerHTML = '';
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgData = {
                    path: e.target.result,
                    word: file.name.split('.')[0],
                    name: file.name.split('.')[0],
                    isCustom: true
                };
                
                this.uploadedImages.push(imgData);
                this.createImageItem(imgData, uploadedImagesPreview);
            };
            reader.readAsDataURL(file);
        });
    }

    setupActionButtons() {
        // Generate buttons
        const generateDropdownBtn = this.shadowRoot.getElementById('generateDropdownBtn');
        const generateWorksheetBtn = this.shadowRoot.getElementById('generateWorksheetBtn');
        const generateAnswerKeyBtn = this.shadowRoot.getElementById('generateAnswerKeyBtn');
        
        generateDropdownBtn.addEventListener('click', () => {
            const dropdown = this.shadowRoot.getElementById('generateDropdownContent');
            dropdown.classList.toggle('show');
        });
        
        generateWorksheetBtn.addEventListener('click', () => {
            this.generateWorksheet();
        });
        
        generateAnswerKeyBtn.addEventListener('click', () => {
            this.generateAnswerKey();
        });
        
        // Download buttons
        const downloadDropdownBtn = this.shadowRoot.getElementById('downloadDropdownBtn');
        const downloadWsJpegBtn = this.shadowRoot.getElementById('downloadWsJpegBtn');
        const downloadAkJpegBtn = this.shadowRoot.getElementById('downloadAkJpegBtn');
        const downloadWsPdfBtn = this.shadowRoot.getElementById('downloadWsPdfBtn');
        const downloadAkPdfBtn = this.shadowRoot.getElementById('downloadAkPdfBtn');
        
        downloadDropdownBtn.addEventListener('click', () => {
            const dropdown = this.shadowRoot.getElementById('downloadDropdownContent');
            dropdown.classList.toggle('show');
        });
        
        downloadWsJpegBtn.addEventListener('click', () => {
            this.downloadJPEG(this.worksheetCanvas, 'pattern-worksheet.jpg');
        });
        
        downloadAkJpegBtn.addEventListener('click', () => {
            this.downloadJPEG(this.answerKeyCanvas, 'pattern-answer-key.jpg');
        });
        
        downloadWsPdfBtn.addEventListener('click', () => {
            this.downloadPDF(this.worksheetCanvas, 'pattern-worksheet.pdf');
        });
        
        downloadAkPdfBtn.addEventListener('click', () => {
            this.downloadPDF(this.answerKeyCanvas, 'pattern-answer-key.pdf');
        });
        
        // Clear button
        const clearBtn = this.shadowRoot.getElementById('clearBtn');
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all content?')) {
                this.clearAll();
            }
        });
        
        // Mobile menu toggle
        const menuToggleBtn = this.shadowRoot.getElementById('menuToggleBtn');
        const panel = this.shadowRoot.querySelector('.panel');
        
        menuToggleBtn.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    setupTabSystem() {
        const tabButtons = this.shadowRoot.querySelectorAll('.tab-button');
        const tabs = this.shadowRoot.querySelectorAll('.tab');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Update button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update tab visibility
                tabs.forEach(tab => tab.classList.remove('active'));
                this.shadowRoot.getElementById(targetTab).classList.add('active');
                
                // Set active canvas
                this.activeCanvas = targetTab === 'worksheetTab' ? 
                    this.worksheetCanvas : this.answerKeyCanvas;
            });
        });
        
        // Set initial active canvas
        this.activeCanvas = this.worksheetCanvas;
    }

    setupCanvasEvents() {
        [this.worksheetCanvas, this.answerKeyCanvas].forEach(canvas => {
            canvas.on('selection:created', () => {
                this.showContextToolbar();
            });
            
            canvas.on('selection:updated', () => {
                this.showContextToolbar();
            });
            
            canvas.on('selection:cleared', () => {
                this.hideContextToolbar();
            });
        });
    }

    showContextToolbar() {
        const toolbar = this.shadowRoot.getElementById('object-context-toolbar');
        if (toolbar) {
            toolbar.style.display = 'flex';
        }
    }

    hideContextToolbar() {
        const toolbar = this.shadowRoot.getElementById('object-context-toolbar');
        if (toolbar) {
            toolbar.style.display = 'none';
        }
    }

    generateWorksheet() {
        this.worksheetCanvas.clear();
        this.worksheetCanvas.backgroundColor = '#FFFFFF';
        
        const canvasWidth = this.currentCanvasConfig.width;
        const canvasHeight = this.currentCanvasConfig.height;
        
        // Add title
        const titleInput = this.shadowRoot.getElementById('titleInput');
        const title = titleInput.value || 'Complete the Pattern';
        
        const titleText = new fabric.Text(title, {
            left: canvasWidth / 2,
            top: 40,
            fontSize: 36,
            fontWeight: 'bold',
            fontFamily: 'Quicksand',
            fill: '#333333',
            originX: 'center'
        });
        
        this.worksheetCanvas.add(titleText);
        
        // Add instructions
        const instructionsInput = this.shadowRoot.getElementById('instructionsInput');
        const instructions = instructionsInput.value || 'Look at the pattern and fill in the missing element';
        
        const instructionsText = new fabric.Text(instructions, {
            left: canvasWidth / 2,
            top: 90,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: '#666666',
            originX: 'center'
        });
        
        this.worksheetCanvas.add(instructionsText);
        
        // Generate patterns
        const exerciseCount = parseInt(this.shadowRoot.getElementById('exerciseCount').value);
        const includeNumbers = this.shadowRoot.getElementById('includeNumbersCheckbox').checked;
        const randomStart = this.shadowRoot.getElementById('randomStartCheckbox').checked;
        const randomBlank = this.shadowRoot.getElementById('randomBlankCheckbox').checked;
        
        const startY = 150;
        const patternHeight = (canvasHeight - startY - 50) / Math.ceil(exerciseCount / 2);
        const columnWidth = canvasWidth / 2;
        
        for (let i = 0; i < exerciseCount; i++) {
            const config = this.puzzleConfigs[i];
            if (!config || config.images.length === 0) continue;
            
            const col = i % 2;
            const row = Math.floor(i / 2);
            
            const x = col * columnWidth + columnWidth / 2;
            const y = startY + row * patternHeight + patternHeight / 2;
            
            this.renderPattern(
                config,
                x,
                y,
                i + 1,
                includeNumbers,
                randomStart,
                randomBlank,
                false // Not answer key
            );
        }
        
        this.worksheetCanvas.renderAll();
        
        // Enable download and answer key buttons
        this.shadowRoot.getElementById('downloadDropdownBtn').disabled = false;
        this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = false;
        
        this.showMessage('Worksheet generated successfully!', 'success');
    }

    generateAnswerKey() {
        this.answerKeyCanvas.clear();
        this.answerKeyCanvas.backgroundColor = '#FFFFFF';
        
        const canvasWidth = this.currentCanvasConfig.width;
        const canvasHeight = this.currentCanvasConfig.height;
        
        // Add title
        const titleText = new fabric.Text('Answer Key', {
            left: canvasWidth / 2,
            top: 40,
            fontSize: 36,
            fontWeight: 'bold',
            fontFamily: 'Quicksand',
            fill: '#333333',
            originX: 'center'
        });
        
        this.answerKeyCanvas.add(titleText);
        
        // Generate patterns with answers
        const exerciseCount = parseInt(this.shadowRoot.getElementById('exerciseCount').value);
        const includeNumbers = this.shadowRoot.getElementById('includeNumbersCheckbox').checked;
        const randomStart = this.shadowRoot.getElementById('randomStartCheckbox').checked;
        const randomBlank = this.shadowRoot.getElementById('randomBlankCheckbox').checked;
        
        const startY = 100;
        const patternHeight = (canvasHeight - startY - 50) / Math.ceil(exerciseCount / 2);
        const columnWidth = canvasWidth / 2;
        
        for (let i = 0; i < exerciseCount; i++) {
            const config = this.puzzleConfigs[i];
            if (!config || config.images.length === 0) continue;
            
            const col = i % 2;
            const row = Math.floor(i / 2);
            
            const x = col * columnWidth + columnWidth / 2;
            const y = startY + row * patternHeight + patternHeight / 2;
            
            this.renderPattern(
                config,
                x,
                y,
                i + 1,
                includeNumbers,
                randomStart,
                randomBlank,
                true // Answer key
            );
        }
        
        this.answerKeyCanvas.renderAll();
        
        // Enable answer key download
        this.shadowRoot.getElementById('downloadAkJpegBtn').disabled = false;
        this.shadowRoot.getElementById('downloadAkPdfBtn').disabled = false;
        
        this.showMessage('Answer key generated successfully!', 'success');
    }

    renderPattern(config, centerX, centerY, puzzleNumber, includeNumbers, randomStart, randomBlank, isAnswerKey) {
        const canvas = isAnswerKey ? this.answerKeyCanvas : this.worksheetCanvas;
        const pattern = config.pattern;
        const images = config.images;
        const questionType = config.questionType;
        
        if (images.length === 0) return;
        
        // Create pattern sequence
        const sequence = [];
        const patternMap = {};
        const uniqueLetters = Array.from(new Set(pattern.split('')));
        
        uniqueLetters.forEach((letter, index) => {
            if (index < images.length) {
                patternMap[letter] = images[index];
            }
        });
        
        // Generate full pattern (2-3 repetitions)
        const repetitions = 2;
        for (let i = 0; i < repetitions; i++) {
            for (const letter of pattern) {
                if (patternMap[letter]) {
                    sequence.push(patternMap[letter]);
                }
            }
        }
        
        // Add partial pattern for the question
        const partialLength = Math.floor(pattern.length / 2);
        for (let i = 0; i < partialLength; i++) {
            const letter = pattern[i];
            if (patternMap[letter]) {
                sequence.push(patternMap[letter]);
            }
        }
        
        // Determine blank position
        let blankIndex = sequence.length;
        if (!isAnswerKey) {
            sequence.push(null); // Placeholder for blank
        } else {
            // Add the correct answer
            const nextLetter = pattern[partialLength % pattern.length];
            sequence.push(patternMap[nextLetter]);
        }
        
        // Calculate layout
        const itemSize = 50;
        const spacing = 10;
        const totalWidth = sequence.length * (itemSize + spacing) - spacing;
        const startX = centerX - totalWidth / 2;
        
        // Add puzzle number if enabled
        if (includeNumbers) {
            const numberText = new fabric.Text(`${puzzleNumber}.`, {
                left: startX - 30,
                top: centerY,
                fontSize: 16,
                fontFamily: 'Arial',
                fill: '#333333',
                originY: 'center'
            });
            canvas.add(numberText);
        }
        
        // Render pattern items
        sequence.forEach((img, index) => {
            const x = startX + index * (itemSize + spacing) + itemSize / 2;
            
            if (img === null && !isAnswerKey) {
                // Draw blank box
                const box = new fabric.Rect({
                    left: x,
                    top: centerY,
                    width: itemSize,
                    height: itemSize,
                    fill: 'transparent',
                    stroke: '#333333',
                    strokeWidth: 2,
                    strokeDashArray: [5, 5],
                    originX: 'center',
                    originY: 'center'
                });
                canvas.add(box);
                
                // Add question mark
                const questionMark = new fabric.Text('?', {
                    left: x,
                    top: centerY,
                    fontSize: 24,
                    fontFamily: 'Arial',
                    fill: '#999999',
                    originX: 'center',
                    originY: 'center'
                });
                canvas.add(questionMark);
                
                // Add options if questionType is 'options'
                if (questionType === 'options') {
                    this.renderOptions(canvas, x, centerY + itemSize + 20, patternMap, pattern, partialLength);
                }
            } else if (img) {
                // Load and render image
                fabric.Image.fromURL(img.path, (fabricImg) => {
                    fabricImg.set({
                        left: x,
                        top: centerY,
                        originX: 'center',
                        originY: 'center'
                    });
                    fabricImg.scaleToWidth(itemSize);
                    fabricImg.scaleToHeight(itemSize);
                    canvas.add(fabricImg);
                    canvas.renderAll();
                });
            }
        });
    }

    renderOptions(canvas, x, y, patternMap, pattern, currentPosition) {
        const options = Object.values(patternMap);
        const correctAnswer = patternMap[pattern[currentPosition % pattern.length]];
        
        // Shuffle options
        const shuffled = [...options].sort(() => Math.random() - 0.5);
        
        const optionSize = 40;
        const spacing = 5;
        const totalWidth = shuffled.length * (optionSize + spacing) - spacing;
        const startX = x - totalWidth / 2;
        
        shuffled.forEach((img, index) => {
            const optionX = startX + index * (optionSize + spacing) + optionSize / 2;
            
            // Draw option box
            const box = new fabric.Rect({
                left: optionX,
                top: y + optionSize / 2,
                width: optionSize,
                height: optionSize,
                fill: 'transparent',
                stroke: '#cccccc',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(box);
            
            // Load option image
            fabric.Image.fromURL(img.path, (fabricImg) => {
                fabricImg.set({
                    left: optionX,
                    top: y + optionSize / 2,
                    originX: 'center',
                    originY: 'center'
                });
                fabricImg.scaleToWidth(optionSize - 4);
                fabricImg.scaleToHeight(optionSize - 4);
                canvas.add(fabricImg);
                canvas.renderAll();
            });
        });
    }

    async downloadJPEG(canvas, filename) {
        const grayscale = this.shadowRoot.getElementById('grayscaleToggle').checked;
        
        // Save current state
        const currentZoom = canvas.getZoom();
        const currentWidth = canvas.getWidth();
        const currentHeight = canvas.getHeight();
        
        // Reset for export
        canvas.setZoom(1);
        canvas.setDimensions({
            width: this.currentCanvasConfig.width,
            height: this.currentCanvasConfig.height
        });
        
        // Apply grayscale if needed
        if (grayscale) {
            canvas.getObjects().forEach(obj => {
                if (obj.filters) {
                    obj.filters.push(new fabric.Image.filters.Grayscale());
                    obj.applyFilters();
                }
            });
            canvas.renderAll();
        }
        
        // Get data URL
        const dataURL = canvas.toDataURL('image/jpeg', 1.0);
        
        // Remove grayscale
        if (grayscale) {
            canvas.getObjects().forEach(obj => {
                if (obj.filters) {
                    obj.filters = [];
                    obj.applyFilters();
                }
            });
        }
        
        // Restore display state
        canvas.setZoom(currentZoom);
        canvas.setDimensions({
            width: currentWidth,
            height: currentHeight
        });
        canvas.renderAll();
        
        // Download
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataURL;
        link.click();
    }

    async downloadPDF(canvas, filename) {
        const { jsPDF } = window.jspdf;
        const grayscale = this.shadowRoot.getElementById('grayscaleToggle').checked;
        
        // Save current state
        const currentZoom = canvas.getZoom();
        const currentWidth = canvas.getWidth();
        const currentHeight = canvas.getHeight();
        
        // Reset for export
        canvas.setZoom(1);
        canvas.setDimensions({
            width: this.currentCanvasConfig.width,
            height: this.currentCanvasConfig.height
        });
        
        // Apply grayscale if needed
        if (grayscale) {
            canvas.getObjects().forEach(obj => {
                if (obj.filters) {
                    obj.filters.push(new fabric.Image.filters.Grayscale());
                    obj.applyFilters();
                }
            });
            canvas.renderAll();
        }
        
        // Determine orientation
        const orientation = this.currentCanvasConfig.width > this.currentCanvasConfig.height ? 
            'landscape' : 'portrait';
        
        // Create PDF
        const pdf = new jsPDF({
            orientation: orientation,
            unit: 'pt',
            format: [this.currentCanvasConfig.width, this.currentCanvasConfig.height]
        });
        
        // Get canvas data
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Add image
        pdf.addImage(imgData, 'JPEG', 0, 0, 
            this.currentCanvasConfig.width, this.currentCanvasConfig.height);
        
        // Remove grayscale
        if (grayscale) {
            canvas.getObjects().forEach(obj => {
                if (obj.filters) {
                    obj.filters = [];
                    obj.applyFilters();
                }
            });
        }
        
        // Restore display state
        canvas.setZoom(currentZoom);
        canvas.setDimensions({
            width: currentWidth,
            height: currentHeight
        });
        canvas.renderAll();
        
        // Save PDF
        pdf.save(filename);
    }

    clearAll() {
        this.worksheetCanvas.clear();
        this.worksheetCanvas.backgroundColor = '#FFFFFF';
        this.worksheetCanvas.renderAll();
        
        this.answerKeyCanvas.clear();
        this.answerKeyCanvas.backgroundColor = '#FFFFFF';
        this.answerKeyCanvas.renderAll();
        
        // Reset configurations
        this.puzzleConfigs = [];
        this.updatePuzzleConfigurations();
        
        // Disable download buttons
        this.shadowRoot.getElementById('downloadDropdownBtn').disabled = true;
        this.shadowRoot.getElementById('generateAnswerKeyBtn').disabled = true;
        this.shadowRoot.getElementById('downloadAkJpegBtn').disabled = true;
        this.shadowRoot.getElementById('downloadAkPdfBtn').disabled = true;
        
        this.showMessage('All content cleared', 'success');
    }

    showMessage(text, type = 'info') {
        const message = this.shadowRoot.getElementById('message');
        message.textContent = text;
        message.className = type;
        
        setTimeout(() => {
            message.textContent = '';
            message.className = '';
        }, 3000);
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

customElements.define('lcs-pattern-worksheet', PatternWorksheetGenerator);