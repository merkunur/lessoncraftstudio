import { BaseWebComponent } from '/api/web-components/shared/BaseWebComponent.js';

class BigSmallAppGenerator extends BaseWebComponent {
  constructor() {
    super();
    this.selectedImages = new Set();
    this.worksheetCanvas = null;
    this.currentExercises = [];
    this.currentLocale = 'en';
    this.currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait default
    this.allImages = [];
    this.loadedImageCount = 0;
    this.INITIAL_LOAD_COUNT = 10;
  }

  get appName() {
    return 'big-small-app';
  }

  getDefaultTranslations() {
    return {
      en: {
        bigSmallApp: {
          title: 'Big & Small Worksheet Generator',
          pageSize: 'Page Size',
          language: 'Language',
          theme: 'Theme',
          allThemes: 'All Themes',
          search: 'Search',
          searchImages: 'Search images...',
          exerciseCount: 'Number of Exercises (1-10)',
          imagesPerExercise: 'Images per Exercise',
          questionType: 'Question Type',
          findSmall: 'Circle the small one',
          findBig: 'Circle the big one',
          findMed: 'Circle the medium one',
          selectImages: 'Select Images (minimum 1)',
          generate: 'Generate Worksheet',
          noImagesError: 'Please select at least one image',
          maxImagesError: 'Maximum 30 images allowed',
          downloadJPEG: 'Download JPEG'
        },
        common: {
          clear: 'Clear Selection',
          download: 'Download PDF',
          print: 'Print'
        }
      }
    };
  }

  getStyles() {
    return `
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      }

      .big-small-app {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 2rem;
        padding: 1.5rem;
        min-height: 600px;
      }

      @media (max-width: 768px) {
        .big-small-app {
          grid-template-columns: 1fr;
        }
      }

      .controls-panel {
        background: #f9fafb;
        border-radius: 0.5rem;
        padding: 1.5rem;
      }

      .controls-panel h2 {
        margin: 0 0 1.5rem 0;
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .settings-group {
        margin-bottom: 1.5rem;
      }

      .settings-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #374151;
        font-weight: 500;
        font-size: 0.875rem;
      }

      select, input[type="number"] {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        background: white;
        color: #1f2937;
        font-size: 0.875rem;
      }

      select:focus, input[type="number"]:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .image-selector {
        margin-top: 1.5rem;
      }

      .image-selector h3 {
        margin: 0 0 1rem 0;
        color: #374151;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 0.5rem;
        max-height: 300px;
        overflow-y: auto;
        padding: 0.5rem;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
      }

      .image-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        border: 2px solid transparent;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .image-item:hover {
        background: #f3f4f6;
      }

      .image-item.selected {
        border-color: #3b82f6;
        background: #eff6ff;
      }

      .image-item img {
        width: 40px;
        height: 40px;
        object-fit: contain;
        margin-bottom: 0.25rem;
      }

      .image-item span {
        font-size: 0.625rem;
        text-align: center;
        color: #6b7280;
      }

      .selected-count {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: #6b7280;
        text-align: center;
      }

      .btn-primary {
        width: 100%;
        padding: 0.625rem 1rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }

      .btn-primary:hover {
        background: #2563eb;
      }

      .btn-primary:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      .btn-secondary {
        width: 100%;
        padding: 0.625rem 1rem;
        background: white;
        color: #374151;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-secondary:hover {
        background: #f9fafb;
        border-color: #9ca3af;
      }

      .preview-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
      }

      #worksheetPreview {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        min-width: 600px;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .canvas-wrapper {
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        overflow: visible !important;
        position: relative;
      }

      /* Fix canvas clipping with zoom */
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

      #canvasWrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 400px;
        padding: 20px;
      }

      .theme-controls {
        margin-bottom: 1rem;
      }

      .search-box {
        position: relative;
        margin-top: 0.5rem;
      }

      .search-box input {
        width: 100%;
        padding: 0.5rem;
        padding-right: 2rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
      }

      .search-box button {
        position: absolute;
        right: 0.25rem;
        top: 50%;
        transform: translateY(-50%);
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        cursor: pointer;
      }

      #customSizeInputs {
        display: none;
        margin-top: 0.5rem;
      }

      #customSizeInputs input {
        width: calc(50% - 0.25rem);
        margin-right: 0.5rem;
      }

      .action-buttons {
        display: flex;
        gap: 0.75rem;
        margin-top: 1.5rem;
        width: 100%;
        max-width: 600px;
      }

      .action-buttons button {
        flex: 1;
      }

      .placeholder-message {
        color: #9ca3af;
        font-size: 1.125rem;
        text-align: center;
      }

      .premium-badge {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.625rem;
        font-weight: 600;
        margin-left: 0.25rem;
        vertical-align: middle;
      }
    `;
  }

  render() {
    const isPremium = this._subscription !== 'free';
    
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="big-small-app">
        <div class="controls-panel">
          <h2 data-i18n="bigSmallApp.title"></h2>
          
          <div class="settings-group">
            <label data-i18n="bigSmallApp.language"></label>
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
          
          <div class="settings-group">
            <label data-i18n="bigSmallApp.pageSize"></label>
            <select id="pageSize">
              <option value="612x792" selected>Letter Portrait (612×792)</option>
              <option value="792x612">Letter Landscape (792×612)</option>
              <option value="595x842">A4 Portrait (595×842)</option>
              <option value="842x595">A4 Landscape (842×595)</option>
              <option value="1200x1200">Square (1200×1200)</option>
              <option value="custom">Custom</option>
            </select>
            <div id="customSizeInputs">
              <input type="number" id="customWidth" placeholder="Width" min="100" max="2000">
              <input type="number" id="customHeight" placeholder="Height" min="100" max="2000">
            </div>
          </div>

          <div class="settings-group">
            <label data-i18n="bigSmallApp.exerciseCount"></label>
            <input type="number" id="exerciseCount" value="4" min="1" max="10">
          </div>

          <div class="settings-group">
            <label data-i18n="bigSmallApp.imagesPerExercise"></label>
            <select id="imagesPerExercise">
              <option value="2">2</option>
              <option value="3" selected>3</option>
            </select>
          </div>

          <div class="settings-group">
            <label data-i18n="bigSmallApp.questionType"></label>
            <select id="questionType">
              <option value="findSmall" data-i18n="bigSmallApp.findSmall"></option>
              <option value="findBig" selected data-i18n="bigSmallApp.findBig"></option>
              <option value="findMed" data-i18n="bigSmallApp.findMed"></option>
            </select>
          </div>

          <div class="image-selector">
            <h3 data-i18n="bigSmallApp.selectImages"></h3>
            <div class="theme-controls">
              <label data-i18n="bigSmallApp.theme"></label>
              <select id="themeSelect">
                <option value="all" data-i18n="bigSmallApp.allThemes"></option>
              </select>
              <div class="search-box">
                <input type="text" id="searchInput" data-i18n-placeholder="bigSmallApp.searchImages" placeholder="Search images...">
                <button id="searchBtn" data-i18n="bigSmallApp.search">Search</button>
              </div>
            </div>
            <div id="imageGrid" class="image-grid"></div>
            <div class="selected-count" id="selectedCount">Selected: 0 images</div>
          </div>

          <button id="generateBtn" class="btn-primary" data-i18n="bigSmallApp.generate">
            Generate Worksheet
          </button>
          
          <button id="clearBtn" class="btn-secondary" style="margin-top: 0.5rem;" data-i18n="common.clear">
            Clear Selection
          </button>
        </div>

        <div class="preview-panel">
          <div id="worksheetPreview">
            <div class="placeholder-message">
              Select images and click "Generate Worksheet" to create your worksheet
            </div>
          </div>
          
          <div class="action-buttons" id="actionButtons" style="display: none;">
            <button id="downloadBtn" class="btn-secondary" data-i18n="common.download">
              Download PDF
            </button>
            <button id="downloadJPEGBtn" class="btn-secondary" data-i18n="bigSmallApp.downloadJPEG">
              Download JPEG
            </button>
            <button id="printBtn" class="btn-secondary" data-i18n="common.print">
              Print
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Initialize locale from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    if (localeParam) {
      this.currentLocale = localeParam;
    }
    
    this.updateUIText();
    this.loadThemes();
    this.initializeLanguageHandler();
    this.initializePageSizeHandler();
  }

  initializeLanguageHandler() {
    const languageSelect = this.shadowRoot.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.currentLocale;
      languageSelect.addEventListener('change', (e) => {
        this.currentLocale = e.target.value;
        this.updateUIText();
        this.loadThemes();
        // Reload images if theme is selected
        const themeSelect = this.shadowRoot.getElementById('themeSelect');
        if (themeSelect && themeSelect.value && themeSelect.value !== 'all') {
          this.loadThemeImages(themeSelect.value);
        }
      });
    }
  }

  initializePageSizeHandler() {
    const pageSizeSelect = this.shadowRoot.getElementById('pageSize');
    const customSizeInputs = this.shadowRoot.getElementById('customSizeInputs');
    const customWidth = this.shadowRoot.getElementById('customWidth');
    const customHeight = this.shadowRoot.getElementById('customHeight');

    pageSizeSelect?.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        customSizeInputs.style.display = 'block';
      } else {
        customSizeInputs.style.display = 'none';
        const [width, height] = e.target.value.split('x').map(Number);
        this.updateCanvasDisplayDimensions(width, height);
      }
    });

    customWidth?.addEventListener('change', () => this.updateCustomSize());
    customHeight?.addEventListener('change', () => this.updateCustomSize());
  }

  updateCustomSize() {
    const customWidth = this.shadowRoot.getElementById('customWidth');
    const customHeight = this.shadowRoot.getElementById('customHeight');
    const width = parseInt(customWidth.value) || 612;
    const height = parseInt(customHeight.value) || 792;
    this.updateCanvasDisplayDimensions(width, height);
  }

  updateCanvasDisplayDimensions(width, height) {
    this.currentCanvasConfig.width = width;
    this.currentCanvasConfig.height = height;
    
    if (!this.worksheetCanvas) return;
    
    const maxDisplayWidth = window.innerWidth * 0.8;
    const maxDisplayHeight = window.innerHeight * 0.7;
    
    let displayWidth = width;
    let displayHeight = height;
    
    // Calculate scale to fit screen
    const scaleX = maxDisplayWidth / width;
    const scaleY = maxDisplayHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);
    
    displayWidth = Math.round(width * scale);
    displayHeight = Math.round(height * scale);
    
    // Apply zoom for display
    const finalZoom = displayWidth / width;
    this.worksheetCanvas.setZoom(finalZoom);
    
    // CRITICAL: Set dimensions AFTER zoom
    this.worksheetCanvas.setDimensions({
      width: displayWidth,
      height: displayHeight
    });
    
    // Re-render canvas
    this.worksheetCanvas.renderAll();
  }

  async loadThemes() {
    try {
      // Skip Strapi API for now, use filesystem API directly
      let response = await fetch(`/api/themes-translated?locale=${this.currentLocale}`);
      if (!response.ok) {
        response = await fetch(`/api/themes-translated?locale=${this.currentLocale}`);
      }
      if (!response.ok) throw new Error('Failed to load themes');
      
      const themeData = await response.json();
      
      const themeSelect = this.shadowRoot.getElementById('themeSelect');
      if (themeSelect) {
        const currentValue = themeSelect.value;
        themeSelect.innerHTML = `<option value="all" data-i18n="bigSmallApp.allThemes">${this.getTranslation('bigSmallApp.allThemes')}</option>`;
        
        // Handle both array format (Word Search style) and object format
        const themes = Array.isArray(themeData) ? themeData : (themeData.themes || []);
        themes.forEach(theme => {
          const option = document.createElement('option');
          // Handle both formats: {value, displayName} or {folder, name}
          option.value = theme.value || theme.folder;
          option.textContent = theme.displayName || theme.name;
          themeSelect.appendChild(option);
        });
        
        if (currentValue) {
          themeSelect.value = currentValue;
        }
        
        // Load default theme (animals) if "All Themes" is selected
        if (themeSelect.value === 'all') {
          this.loadThemeImages('animals');
        }
      }
    } catch (error) {
      console.error('Error loading themes:', error);
      // Fallback to sample images
      this.updateImageLibrary();
    }
  }

  async loadThemeImages(theme) {
    try {
      // Use filesystem API directly for now
      let response = await fetch(`/api/images?theme=${encodeURIComponent(theme)}&locale=${this.currentLocale}`);
      if (!response.ok) {
        response = await fetch(`/api/images?theme=${encodeURIComponent(theme)}&locale=${this.currentLocale}`);
      }
      if (!response.ok) throw new Error(`Failed to load theme: ${theme}`);
      
      const data = await response.json();
      // Handle both formats: direct array or {images: array}
      this.allImages = Array.isArray(data) ? data : (data.images || []);
      
      // Clear grid first
      const imageGrid = this.shadowRoot.getElementById('imageGrid');
      if (imageGrid) {
        imageGrid.innerHTML = '';
      }
      
      // Load first batch immediately
      this.displayImages(this.allImages.slice(0, this.INITIAL_LOAD_COUNT));
      
      // Load rest lazily
      if (this.allImages.length > this.INITIAL_LOAD_COUNT) {
        setTimeout(() => {
          this.displayImages(this.allImages.slice(this.INITIAL_LOAD_COUNT));
        }, 100);
      }
    } catch (error) {
      console.error('Error loading theme images:', error);
      this.updateImageLibrary();
    }
  }

  async searchImages(query) {
    if (!query) {
      const themeSelect = this.shadowRoot.getElementById('themeSelect');
      if (themeSelect.value === 'all') {
        this.loadThemeImages('animals');
      } else if (themeSelect.value) {
        this.loadThemeImages(themeSelect.value);
      }
      return;
    }
    
    try {
      // Use filesystem API directly for now
      let response = await fetch(`/api/images?search=${encodeURIComponent(query)}&locale=${this.currentLocale}`);
      if (!response.ok) {
        response = await fetch(`/api/images?search=${encodeURIComponent(query)}&locale=${this.currentLocale}`);
      }
      if (!response.ok) throw new Error(`Failed to search for "${query}"`);
      
      const data = await response.json();
      // Handle both formats: direct array or {images: array}
      this.allImages = Array.isArray(data) ? data : (data.images || []);
      
      const imageGrid = this.shadowRoot.getElementById('imageGrid');
      if (imageGrid) {
        imageGrid.innerHTML = '';
      }
      
      this.displayImages(this.allImages);
    } catch (error) {
      console.error('Error searching images:', error);
      // Show error message in grid
      const imageGrid = this.shadowRoot.getElementById('imageGrid');
      if (imageGrid) {
        imageGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">Error searching images: ${error.message}</p>`;
      }
    }
  }

  displayImages(images) {
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    if (!imageGrid) return;
    
    if (!images || images.length === 0) {
      imageGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No images found. Try selecting a different theme.</p>`;
      return;
    }
    
    images.forEach(imgData => {
      const item = document.createElement('div');
      item.className = 'image-item';
      // Use name for translated display, word as identifier
      const displayName = imgData.name || imgData.word || 'Unknown';
      const imageId = imgData.word || displayName;
      const imagePath = imgData.path || imgData.url || '/images/placeholder.png';
      
      if (this.selectedImages.has(imageId)) {
        item.classList.add('selected');
      }
      
      item.innerHTML = `
        <img src="${imagePath}" 
             alt="${displayName}" 
             loading="lazy"
             decoding="async"
             onerror="this.src='/images/placeholder.png'"/>
        <span>${displayName}</span>
      `;
      
      item.addEventListener('click', () => this.toggleImage({
        id: imageId,
        displayName: displayName,
        url: imagePath
      }));
      imageGrid.appendChild(item);
    });
    
    this.updateSelectedCount();
  }

  updateImageLibrary() {
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    if (!imageGrid) return;

    imageGrid.innerHTML = '';
    
    // Use sample images as fallback
    const images = this.getSampleImages();
    
    images.forEach(image => {
      const item = document.createElement('div');
      item.className = 'image-item';
      if (this.selectedImages.has(image.id || image.displayName)) {
        item.classList.add('selected');
      }
      
      item.innerHTML = `
        <img src="${image.url || '/images/placeholder.png'}" alt="${image.displayName}" loading="lazy">
        <span>${image.displayName}</span>
      `;
      
      item.addEventListener('click', () => this.toggleImage(image));
      imageGrid.appendChild(item);
    });
    
    this.updateSelectedCount();
  }

  getSampleImages() {
    // Default sample images for testing
    return [
      { id: 'cat', displayName: 'CAT', url: '/images/animals/cat.png' },
      { id: 'dog', displayName: 'DOG', url: '/images/animals/dog.png' },
      { id: 'bird', displayName: 'BIRD', url: '/images/animals/bird.png' },
      { id: 'fish', displayName: 'FISH', url: '/images/animals/fish.png' },
      { id: 'lion', displayName: 'LION', url: '/images/animals/lion.png' },
      { id: 'bear', displayName: 'BEAR', url: '/images/animals/bear.png' }
    ];
  }

  toggleImage(image) {
    const imageId = image.id || image.displayName;
    
    if (this.selectedImages.has(imageId)) {
      this.selectedImages.delete(imageId);
    } else {
      if (this.selectedImages.size >= 30) {
        alert(this.getTranslation('bigSmallApp.maxImagesError'));
        return;
      }
      this.selectedImages.add(imageId);
    }
    
    // Store the image data for later use
    if (!this.selectedImageData) {
      this.selectedImageData = new Map();
    }
    if (this.selectedImages.has(imageId)) {
      this.selectedImageData.set(imageId, image);
    } else {
      this.selectedImageData.delete(imageId);
    }
    
    // Update UI
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    const items = imageGrid.querySelectorAll('.image-item');
    items.forEach((item) => {
      const img = item.querySelector('img');
      const span = item.querySelector('span');
      const itemId = span?.textContent;
      
      if (this.selectedImages.has(itemId)) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
    
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    const countElement = this.shadowRoot.getElementById('selectedCount');
    if (countElement) {
      countElement.textContent = `Selected: ${this.selectedImages.size} images`;
    }
  }

  setupEventListeners() {
    const generateBtn = this.shadowRoot.getElementById('generateBtn');
    const clearBtn = this.shadowRoot.getElementById('clearBtn');
    const downloadBtn = this.shadowRoot.getElementById('downloadBtn');
    const downloadJPEGBtn = this.shadowRoot.getElementById('downloadJPEGBtn');
    const printBtn = this.shadowRoot.getElementById('printBtn');
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    const searchBtn = this.shadowRoot.getElementById('searchBtn');
    const searchInput = this.shadowRoot.getElementById('searchInput');

    generateBtn?.addEventListener('click', () => this.generateWorksheet());
    clearBtn?.addEventListener('click', () => this.clearSelection());
    downloadBtn?.addEventListener('click', () => this.downloadPDF());
    downloadJPEGBtn?.addEventListener('click', () => this.downloadJPEG());
    printBtn?.addEventListener('click', () => this.printWorksheet());
    
    themeSelect?.addEventListener('change', (e) => {
      if (e.target.value === 'all') {
        this.loadThemeImages('animals');
      } else if (e.target.value) {
        this.loadThemeImages(e.target.value);
      }
    });
    
    searchBtn?.addEventListener('click', () => {
      this.searchImages(searchInput.value);
    });
    
    searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchImages(e.target.value);
      }
    });
  }

  clearSelection() {
    this.selectedImages.clear();
    if (this.selectedImageData) {
      this.selectedImageData.clear();
    }
    // Update UI without reloading images
    const imageGrid = this.shadowRoot.getElementById('imageGrid');
    const items = imageGrid?.querySelectorAll('.image-item');
    items?.forEach(item => item.classList.remove('selected'));
    this.updateSelectedCount();
  }

  async generateWorksheet() {
    if (this.selectedImages.size === 0) {
      alert(this.getTranslation('bigSmallApp.noImagesError'));
      return;
    }

    const preview = this.shadowRoot.getElementById('worksheetPreview');
    preview.innerHTML = '<div class="placeholder-message">Generating worksheet...</div>';

    // Load Fabric.js if not already loaded
    if (typeof fabric === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    }

    // Get page size
    const pageSizeValue = this.shadowRoot.getElementById('pageSize').value;
    let width, height;
    if (pageSizeValue === 'custom') {
      const customWidth = this.shadowRoot.getElementById('customWidth');
      const customHeight = this.shadowRoot.getElementById('customHeight');
      width = parseInt(customWidth.value) || 612;
      height = parseInt(customHeight.value) || 792;
    } else {
      [width, height] = pageSizeValue.split('x').map(Number);
    }
    
    // Update canvas config
    this.currentCanvasConfig.width = width;
    this.currentCanvasConfig.height = height;
    
    preview.innerHTML = `
      <div class="canvas-wrapper" id="canvasWrapper">
        <canvas id="worksheetCanvas"></canvas>
      </div>
    `;
    
    const canvasEl = this.shadowRoot.getElementById('worksheetCanvas');
    this.worksheetCanvas = new fabric.Canvas(canvasEl, {
      width: width,
      height: height,
      backgroundColor: '#ffffff'
    });
    
    // Apply display scaling
    this.updateCanvasDisplayDimensions(width, height);

    // Generate the worksheet content
    await this.generateExercises();

    // Show action buttons
    const actionButtons = this.shadowRoot.getElementById('actionButtons');
    if (actionButtons) {
      actionButtons.style.display = 'flex';
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async generateExercises() {
    const settings = this.getSettings();
    const width = this.currentCanvasConfig.width;
    const height = this.currentCanvasConfig.height;
    const startY = 40;
    const exerciseHeight = (height - startY - 40) / settings.exerciseCount;

    // Get selected images from stored data
    let selectedImagesArray;
    if (this.selectedImageData && this.selectedImageData.size > 0) {
      selectedImagesArray = Array.from(this.selectedImageData.values());
    } else {
      // Fallback to sample images
      const images = this.getSampleImages();
      selectedImagesArray = Array.from(this.selectedImages).map(id => {
        return images.find(img => (img.id || img.displayName) === id);
      }).filter(Boolean);
    }

    for (let i = 0; i < settings.exerciseCount; i++) {
      await this.createExercise(settings, selectedImagesArray, i, startY + i * exerciseHeight);
    }

    this.worksheetCanvas.renderAll();
  }

  getSettings() {
    const pageSizeValue = this.shadowRoot.getElementById('pageSize').value;
    let pageSize;
    if (pageSizeValue === 'custom') {
      const customWidth = this.shadowRoot.getElementById('customWidth');
      const customHeight = this.shadowRoot.getElementById('customHeight');
      const width = parseInt(customWidth.value) || 612;
      const height = parseInt(customHeight.value) || 792;
      pageSize = `${width}x${height}`;
    } else {
      pageSize = pageSizeValue;
    }
    
    return {
      pageSize: pageSize,
      exerciseCount: parseInt(this.shadowRoot.getElementById('exerciseCount').value),
      imagesPerExercise: parseInt(this.shadowRoot.getElementById('imagesPerExercise').value),
      questionType: this.shadowRoot.getElementById('questionType').value
    };
  }

  async createExercise(settings, imagePool, exerciseIndex, yPosition) {
    // Add exercise number
    const numberText = new fabric.Text(`${exerciseIndex + 1}.`, {
      left: 30,
      top: yPosition,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#000000',
      fontWeight: 'bold'
    });
    this.worksheetCanvas.add(numberText);

    // Add question text
    const questionMap = {
      findSmall: 'Circle the small one',
      findBig: 'Circle the big one',
      findMed: 'Circle the medium one'
    };
    
    const questionText = new fabric.Text(questionMap[settings.questionType], {
      left: 60,
      top: yPosition,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#333333'
    });
    this.worksheetCanvas.add(questionText);

    // Select random images
    const exerciseImages = [];
    for (let i = 0; i < settings.imagesPerExercise; i++) {
      const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];
      exerciseImages.push(randomImage);
    }

    // Generate sizes
    const sizes = this.generateSizes(settings.imagesPerExercise);
    
    // Calculate positions using actual canvas dimensions
    const canvasWidth = this.currentCanvasConfig.width;
    const imageSpacing = (canvasWidth - 100) / settings.imagesPerExercise;

    // Create images
    for (let i = 0; i < settings.imagesPerExercise; i++) {
      const image = exerciseImages[i];
      const size = sizes[i];
      const xPosition = 60 + i * imageSpacing;

      const imageUrl = image.url || '/images/placeholder.png';
      
      try {
        await this.createFabricImage(imageUrl, size, xPosition, yPosition + 30);
      } catch (error) {
        console.error('Error loading image:', error);
        // Create placeholder
        const rect = new fabric.Rect({
          left: xPosition,
          top: yPosition + 30,
          width: size,
          height: size,
          fill: '#f0f0f0',
          stroke: '#cccccc',
          strokeWidth: 1
        });
        this.worksheetCanvas.add(rect);
      }
    }
  }

  generateSizes(count) {
    const sizes = count === 2 ? [60, 90] : [50, 75, 100];
    
    // Shuffle
    for (let i = sizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sizes[i], sizes[j]] = [sizes[j], sizes[i]];
    }
    
    return sizes;
  }

  createFabricImage(src, size, x, y) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(src, (img) => {
        if (img && img.width) {
          img.set({
            left: x,
            top: y,
            scaleX: size / img.width,
            scaleY: size / img.height,
            selectable: false
          });
          this.worksheetCanvas.add(img);
        }
        resolve();
      }, { crossOrigin: 'anonymous' });
    });
  }

  async downloadPDF() {
    if (!this.worksheetCanvas) return;

    // Load jsPDF if not already loaded
    if (typeof window.jspdf === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
    
    const { jsPDF } = window.jspdf;
    
    // Save current state
    const currentZoom = this.worksheetCanvas.getZoom();
    const currentWidth = this.worksheetCanvas.getWidth();
    const currentHeight = this.worksheetCanvas.getHeight();
    
    // Reset to actual size for export
    this.worksheetCanvas.setZoom(1);
    this.worksheetCanvas.setDimensions({
      width: this.currentCanvasConfig.width,
      height: this.currentCanvasConfig.height
    });
    
    // Determine orientation
    const orientation = this.currentCanvasConfig.width > this.currentCanvasConfig.height ? 'landscape' : 'portrait';
    
    // Create PDF with user-selected dimensions
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'pt',
      format: [this.currentCanvasConfig.width, this.currentCanvasConfig.height]
    });
    
    // Get canvas data
    const imgData = this.worksheetCanvas.toDataURL('image/jpeg', 1.0);
    
    // Add image at full page size
    pdf.addImage(imgData, 'JPEG', 0, 0, this.currentCanvasConfig.width, this.currentCanvasConfig.height);
    
    // Restore display state
    this.worksheetCanvas.setZoom(currentZoom);
    this.worksheetCanvas.setDimensions({
      width: currentWidth,
      height: currentHeight
    });
    
    // Save PDF
    pdf.save('big-small-worksheet.pdf');
  }

  async downloadJPEG() {
    if (!this.worksheetCanvas) return;
    
    // Save current state
    const currentZoom = this.worksheetCanvas.getZoom();
    const currentWidth = this.worksheetCanvas.getWidth();
    const currentHeight = this.worksheetCanvas.getHeight();
    
    // Reset for export
    this.worksheetCanvas.setZoom(1);
    this.worksheetCanvas.setDimensions({
      width: this.currentCanvasConfig.width,
      height: this.currentCanvasConfig.height
    });
    
    // Get data URL
    const dataURL = this.worksheetCanvas.toDataURL('image/jpeg', 1.0);
    
    // Restore display state
    this.worksheetCanvas.setZoom(currentZoom);
    this.worksheetCanvas.setDimensions({
      width: currentWidth,
      height: currentHeight
    });
    
    // Download
    const link = document.createElement('a');
    link.download = 'big-small-worksheet.jpg';
    link.href = dataURL;
    link.click();
  }

  printWorksheet() {
    if (!this.worksheetCanvas) return;
    
    const printWindow = window.open('', '_blank');
    const dataURL = this.worksheetCanvas.toDataURL();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Big & Small Worksheet</title>
        <style>
          body { margin: 0; padding: 20px; }
          img { max-width: 100%; }
        </style>
      </head>
      <body>
        <img src="${dataURL}" />
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  }
}

customElements.define('lcs-big-small-app', BigSmallAppGenerator);
export default BigSmallAppGenerator;