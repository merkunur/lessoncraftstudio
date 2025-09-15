// PRODUCTION-READY IMAGE LIBRARY MANAGER
// This is the CORE of the entire system - must work 100% reliably

import fs from 'fs';
import path from 'path';

interface ImageLibraryState {
  lastSync: number;
  syncInProgress: boolean;
  themes: Map<string, any>;
  translations: Map<string, any>;
  imageCache: Map<string, any[]>; // Cache processed images per theme
  cacheTimestamps: Map<string, number>; // Track cache age
  backgroundThemes: Map<string, any>; // Background themes
  backgrounds: Map<string, any[]>; // Background images by theme
  borderStyles: Map<string, any>; // Border styles
  borders: Map<string, any[]>; // Border images by style
  templates: Map<string, any[]>; // Templates by app type (legacy)
  trainTemplateThemes: Map<string, any>; // Train template themes
  trainTemplates: Map<string, any[]>; // Train template images
  worksheetTemplateThemes: Map<string, any>; // Worksheet template themes
  worksheetTemplates: Map<string, any[]>; // Worksheet template images
}

interface SyncStats {
  themesCount: number;
  imagesCount: number;
  syncDuration: number;
  memoryUsage: number;
}

class ImageLibraryManager {
  private static instance: ImageLibraryManager;
  private state: ImageLibraryState;
  private syncInterval: NodeJS.Timeout | null = null;
  private initPromise: Promise<void>;
  private initResolver: (() => void) | null = null;
  private isInitialized = false;
  private readonly SYNC_INTERVAL = 60000; // Check every minute
  private readonly DIRECTUS_URL = process.env.DIRECTUS_INTERNAL_URL || 'http://lcs-directus:8055';
  private readonly ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
  private readonly ADMIN_PASSWORD = 'admin123!';
  private readonly API_TOKEN = 'static-api-token-for-sync';
  private retryCount = 0;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAYS = [5000, 15000, 30000]; // 5s, 15s, 30s
  
  private constructor() {
    this.state = {
      lastSync: 0,
      syncInProgress: false,
      themes: new Map(),
      translations: new Map(),
      imageCache: new Map(),
      cacheTimestamps: new Map(),
      backgroundThemes: new Map(),
      backgrounds: new Map(),
      borderStyles: new Map(),
      borders: new Map(),
      templates: new Map(),
      trainTemplateThemes: new Map(),
      trainTemplates: new Map(),
      worksheetTemplateThemes: new Map(),
      worksheetTemplates: new Map()
    };

    // Create initialization promise
    this.initPromise = new Promise<void>((resolve) => {
      this.initResolver = resolve;
    });

    // Load cached translations immediately for instant availability
    this.loadCachedTranslations();

    // Start automatic sync - this will resolve initPromise when first sync completes
    this.startAutoSync();

    // Monitor performance
    this.logSystemStatus();
  }
  
  static getInstance(): ImageLibraryManager {
    if (!ImageLibraryManager.instance) {
      ImageLibraryManager.instance = new ImageLibraryManager();
    }
    return ImageLibraryManager.instance;
  }

  // Wait for initialization to complete
  async waitForInit(): Promise<void> {
    if (this.isInitialized) return;
    await this.initPromise;
  }
  
  // Start automatic sync checking
  private startAutoSync() {
    // Initial sync
    this.syncIfNeeded();
    
    // Regular sync checks
    this.syncInterval = setInterval(() => {
      this.syncIfNeeded();
    }, this.SYNC_INTERVAL);
  }
  
  // Check if sync is needed and do it
  private async syncIfNeeded() {
    const now = Date.now();
    const timeSinceLastSync = now - this.state.lastSync;
    
    // Sync if never synced or more than 5 minutes old
    if (timeSinceLastSync > 300000 || this.state.lastSync === 0) {
      await this.performSync();
    }
  }
  
  // Perform the actual sync with retry logic
  private async performSync(): Promise<boolean> {
    if (this.state.syncInProgress) {
      console.log('Sync already in progress, skipping...');
      return false;
    }
    
    this.state.syncInProgress = true;
    console.log('🔄 Starting automatic image library sync...');
    
    try {
      const success = await this.performSyncWithRetry();
      if (success) {
        this.retryCount = 0; // Reset retry count on success
      }
      return success;
    } finally {
      this.state.syncInProgress = false;
    }
  }
  
  // Perform sync with automatic retry on failure
  private async performSyncWithRetry(): Promise<boolean> {
    const startTime = Date.now();
    let totalThemes = 0;
    let totalImages = 0;
    console.log('🔄 Starting automatic image library sync...');
    
    try {
      // Use static token for authentication
      const headers = { 'Authorization': `Bearer ${this.API_TOKEN}` };
      
      // Fetch all themes
      const themesResponse = await fetch(
        `${this.DIRECTUS_URL}/items/image_themes?filter[is_active][_eq]=true&sort=sort_order`,
        { headers }
      );
      
      if (!themesResponse.ok) {
        throw new Error('Failed to fetch themes from Directus');
      }
      
      const themesData = await themesResponse.json();
      const themes = themesData.data;
      
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      
      // Process themes in batches for better performance
      const BATCH_SIZE = 10;
      for (let i = 0; i < themes.length; i += BATCH_SIZE) {
        const batch = themes.slice(i, i + BATCH_SIZE);
        
        await Promise.all(batch.map(async (theme) => {
          totalThemes++;
        const themePath = path.join(imagesDir, theme.folder_name);
        
        // Create folder if needed
        if (!fs.existsSync(themePath)) {
          fs.mkdirSync(themePath, { recursive: true });
          console.log(`✅ Created theme folder: ${theme.folder_name}`);
        }
        
        // Store theme in memory
        this.state.themes.set(theme.folder_name, theme);
        
        // Fetch images for this theme
        const imagesResponse = await fetch(
          `${this.DIRECTUS_URL}/items/image_assets?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
          { headers }
        );
        
        if (!imagesResponse.ok) return;
        
        const imagesData = await imagesResponse.json();
        const images = imagesData.data;
        
        // Build translations for this theme
        const themeTranslations = {
          folder_name: theme.folder_name,
          name: theme.name || {},
          images: {} as Record<string, any>
        };
        
        // Process each image
        for (const image of images) {
          // Process even if no uploaded file (will use local filesystem)
          
          // Fix filename
          let fileName = image.file_name;
          if (!fileName.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
            const ext = image.image_file?.filename_download?.match(/\.(png|jpg|jpeg|gif|svg)$/i)?.[0] || '.png';
            fileName = fileName + ext;
          }
          
          // Store translations
          const imageKey = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
          themeTranslations.images[imageKey] = image.translations || image.name || {};
          
          const targetPath = path.join(themePath, fileName);
          
          // Download if has uploaded file and doesn't exist locally
          if (image.image_file?.id && !fs.existsSync(targetPath)) {
            try {
              const imageResponse = await fetch(
                `${this.DIRECTUS_URL}/assets/${image.image_file.id}`,
                { headers }
              );
              
              if (imageResponse.ok) {
                const buffer = await imageResponse.arrayBuffer();
                fs.writeFileSync(targetPath, Buffer.from(buffer));
                console.log(`✅ Downloaded: ${theme.folder_name}/${fileName}`);
              }
            } catch (error) {
              console.error(`Failed to download ${fileName}:`, error);
            }
          }
        }
        
          // Always save/update translations file
          const translationsPath = path.join(themePath, 'translations.json');
          fs.writeFileSync(translationsPath, JSON.stringify(themeTranslations, null, 2));
          
          // Store in memory for fast access
          this.state.translations.set(theme.folder_name, themeTranslations);
          
          // Clear image cache for this theme to force reload
          this.state.imageCache.delete(theme.folder_name);
          
          totalImages += Object.keys(themeTranslations.images || {}).length;
        }));
      }
      
      // Sync special image types
      await this.syncSpecialImages(headers);
      
      this.state.lastSync = Date.now();
      const syncDuration = Date.now() - startTime;

      // Log performance metrics
      console.log(`✅ Image library sync completed successfully`);
      console.log(`📊 Sync Stats: ${totalThemes} themes, ${totalImages} images in ${syncDuration}ms`);
      console.log(`💾 Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB used`);

      // Resolve initialization promise on first successful sync
      if (!this.isInitialized && this.initResolver) {
        this.isInitialized = true;
        this.initResolver();
        this.initResolver = null;
        console.log('✅ ImageLibraryManager initialized and ready');
      }

      // Clean up old cache entries
      this.cleanupCache();

      return true;
      
    } catch (error) {
      console.log('⚠️ Sync attempt failed:', error instanceof Error ? error.message : 'Unknown error');
      
      // Retry with exponential backoff
      if (this.retryCount < this.MAX_RETRIES) {
        const delay = this.RETRY_DELAYS[this.retryCount];
        console.log(`🔄 Retrying sync in ${delay / 1000} seconds... (attempt ${this.retryCount + 1}/${this.MAX_RETRIES})`);
        this.retryCount++;
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.performSyncWithRetry(); // Recursive retry
      }
      
      console.log('❌ All retry attempts failed, using cached data');
      // Load translations from filesystem as fallback
      this.loadCachedTranslations();
      return false;
    }
  }
  
  // Load cached translations from filesystem
  private loadCachedTranslations() {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) return;
    
    const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
      .filter(d => d.isDirectory());
    
    for (const folder of folders) {
      const translationsPath = path.join(imagesDir, folder.name, 'translations.json');
      
      if (fs.existsSync(translationsPath)) {
        try {
          const content = fs.readFileSync(translationsPath, 'utf-8');
          const translations = JSON.parse(content);
          this.state.translations.set(folder.name, translations);
        } catch (error) {
          // Ignore parse errors
        }
      }
    }
  }
  
  // PUBLIC METHODS
  
  // Force a sync now
  async forceSync(): Promise<boolean> {
    this.state.lastSync = 0; // Reset to force sync
    return await this.performSync();
  }
  
  // Get all themes with translations
  getThemes(locale: string = 'en'): any[] {
    // Ensure we have latest data
    if (this.state.translations.size === 0) {
      this.loadCachedTranslations();
    }
    
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg', 'background'];
    
    if (!fs.existsSync(imagesDir)) return [];
    
    const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !excludedFolders.includes(d.name));
    
    return folders.map(folder => {
      const translations = this.state.translations.get(folder.name);
      let displayName = folder.name;
      
      // Use translations if available
      if (translations?.name?.[locale]) {
        displayName = translations.name[locale];
      } else if (translations?.name?.['en']) {
        displayName = translations.name['en'];
      } else {
        // Use built-in translations as fallback
        displayName = this.getBuiltInTranslation(folder.name, locale);
      }
      
      return {
        value: folder.name,
        displayName: displayName,
        sortOrder: this.state.themes.get(folder.name)?.sort_order || 999
      };
    }).sort((a, b) => {
      // Sort by sort_order first, then by name
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return a.displayName.localeCompare(b.displayName, locale);
    });
  }
  
  // Get images for a theme with translations (with caching)
  getThemeImages(theme: string, locale: string = 'en'): any[] {
    // Check cache first
    const cacheKey = `${theme}:${locale}`;
    const cached = this.state.imageCache.get(cacheKey);
    const cacheTimestamp = this.state.cacheTimestamps.get(cacheKey) || 0;
    const CACHE_TTL = 300000; // 5 minutes cache
    
    if (cached && (Date.now() - cacheTimestamp < CACHE_TTL)) {
      return cached;
    }
    
    const themePath = path.join(process.cwd(), 'public', 'images', theme);
    
    if (!fs.existsSync(themePath)) return [];
    
    // Ensure translations are loaded
    if (this.state.translations.size === 0) {
      this.loadCachedTranslations();
    }
    
    // Get translations for this theme
    const translations = this.state.translations.get(theme);
    
    const files = fs.readdirSync(themePath);
    const imageExtensions = /\.(png|jpg|jpeg|gif|svg)$/i;
    
    const images = files
      .filter(file => imageExtensions.test(file) && file !== 'translations.json')
      .map(file => {
        const imageKey = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
        let imageName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, ''); // Default to filename without extension
        
        // Use translations if available
        if (translations?.images?.[imageKey]?.[locale]) {
          imageName = translations.images[imageKey][locale];
        } else if (translations?.images?.[imageKey]?.['en']) {
          imageName = translations.images[imageKey]['en'];
        } else {
          // Use built-in translations as fallback
          imageName = this.getBuiltInImageTranslation(imageKey, locale);
        }
        
        return {
          path: `/images/${theme}/${file}`,
          url: `/images/${theme}/${file}`,
          name: imageName,
          word: imageName
        };
      });
    
    // Cache the result
    this.state.imageCache.set(cacheKey, images);
    this.state.cacheTimestamps.set(cacheKey, Date.now());
    
    return images;
  }
  
  // Get sync status with performance metrics
  getSyncStatus(): { lastSync: number; isStale: boolean; isSyncing: boolean; metrics?: any } {
    const now = Date.now();
    const timeSinceLastSync = now - this.state.lastSync;
    
    return {
      lastSync: this.state.lastSync,
      isStale: timeSinceLastSync > 300000, // Stale after 5 minutes
      isSyncing: this.state.syncInProgress,
      metrics: {
        themesLoaded: this.state.themes.size,
        translationsLoaded: this.state.translations.size,
        cacheEntries: this.state.imageCache.size,
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      }
    };
  }
  
  // Clean up old cache entries to prevent memory bloat
  private cleanupCache() {
    const now = Date.now();
    const CACHE_TTL = 300000; // 5 minutes
    const MAX_CACHE_SIZE = 500; // Maximum cache entries
    
    // Remove expired entries
    for (const [key, timestamp] of this.state.cacheTimestamps.entries()) {
      if (now - timestamp > CACHE_TTL) {
        this.state.imageCache.delete(key);
        this.state.cacheTimestamps.delete(key);
      }
    }
    
    // If still too many entries, remove oldest
    if (this.state.imageCache.size > MAX_CACHE_SIZE) {
      const sortedEntries = Array.from(this.state.cacheTimestamps.entries())
        .sort((a, b) => a[1] - b[1]);
      
      const toRemove = sortedEntries.slice(0, sortedEntries.length - MAX_CACHE_SIZE);
      for (const [key] of toRemove) {
        this.state.imageCache.delete(key);
        this.state.cacheTimestamps.delete(key);
      }
    }
  }
  
  // Log system status for monitoring
  private logSystemStatus() {
    setInterval(() => {
      if (this.state.themes.size > 50) { // Only log for large datasets
        const stats = this.getSyncStatus();
        console.log(`[ImageLibrary] Status: ${stats.metrics.themesLoaded} themes, ${stats.metrics.cacheEntries} cached, ${stats.metrics.memoryUsageMB}MB RAM`);
      }
    }, 60000); // Log every minute
  }

  // Clear all caches - for admin use
  clearCache(): void {
    console.log('🧹 Clearing all image library caches...');

    // Clear image caches
    this.state.imageCache.clear();
    this.state.cacheTimestamps.clear();

    // Clear collection caches
    this.state.backgrounds.clear();
    this.state.borders.clear();
    this.state.trainTemplates.clear();
    this.state.worksheetTemplates.clear();

    // Reset last sync to force refresh
    this.state.lastSync = 0;

    console.log('✅ Cache cleared successfully');
  }

  // Get cache statistics
  getCacheStats(): any {
    const totalCacheEntries =
      this.state.imageCache.size +
      this.state.backgrounds.size +
      this.state.borders.size +
      this.state.trainTemplates.size +
      this.state.worksheetTemplates.size;

    let totalImages = 0;
    for (const images of this.state.imageCache.values()) {
      totalImages += images.length;
    }

    return {
      size: totalCacheEntries,
      themes: this.state.themes.size,
      images: totalImages,
      lastSync: this.state.lastSync,
      backgrounds: this.state.backgrounds.size,
      borders: this.state.borders.size,
      templates: this.state.trainTemplates.size + this.state.worksheetTemplates.size
    };
  }
  
  // Built-in translations (fallback)
  private getBuiltInTranslation(themeName: string, locale: string): string {
    const translations: Record<string, Record<string, string>> = {
      'animals': { en: 'Animals', de: 'Tiere', fr: 'Animaux', es: 'Animales', pt: 'Animais', it: 'Animali', nl: 'Dieren', sv: 'Djur', da: 'Dyr', no: 'Dyr', fi: 'Eläimet' },
      'food': { en: 'Food', de: 'Essen', fr: 'Nourriture', es: 'Comida', pt: 'Comida', it: 'Cibo', nl: 'Voedsel', sv: 'Mat', da: 'Mad', no: 'Mat', fi: 'Ruoka' },
      'furniture': { en: 'Furniture', de: 'Möbel', fr: 'Meubles', es: 'Muebles', pt: 'Móveis', it: 'Mobili', nl: 'Meubels', sv: 'Möbler', da: 'Møbler', no: 'Møbler', fi: 'Huonekalut' },
      // Add more as needed
    };
    
    if (translations[themeName.toLowerCase()]) {
      return translations[themeName.toLowerCase()][locale] || 
             translations[themeName.toLowerCase()]['en'] || 
             themeName;
    }
    
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  }
  
  private getBuiltInImageTranslation(imageName: string, locale: string): string {
    const translations: Record<string, Record<string, string>> = {
      'cat': { en: 'Cat', de: 'Katze', fr: 'Chat', es: 'Gato', pt: 'Gato', it: 'Gatto', nl: 'Kat', sv: 'Katt', da: 'Kat', no: 'Katt', fi: 'Kissa' },
      'dog': { en: 'Dog', de: 'Hund', fr: 'Chien', es: 'Perro', pt: 'Cão', it: 'Cane', nl: 'Hond', sv: 'Hund', da: 'Hund', no: 'Hund', fi: 'Koira' },
      // Add more as needed
    };
    
    if (translations[imageName.toLowerCase()]) {
      return translations[imageName.toLowerCase()][locale] || 
             translations[imageName.toLowerCase()]['en'] || 
             imageName;
    }
    
    return imageName.charAt(0).toUpperCase() + imageName.slice(1);
  }
  
  // Sync backgrounds, borders, and templates
  private async syncSpecialImages(headers: any): Promise<void> {
    console.log('Starting syncSpecialImages...');
    try {
      // Sync background themes first
      const bgThemesResponse = await fetch(
        `${this.DIRECTUS_URL}/items/background_themes?filter[is_active][_eq]=true&sort=sort_order`,
        { headers }
      );
      
      if (bgThemesResponse.ok) {
        const bgThemesData = await bgThemesResponse.json();
        console.log(`Syncing ${bgThemesData.data?.length || 0} background themes`);
        
        for (const theme of bgThemesData.data || []) {
          this.state.backgroundThemes.set(theme.folder_name, theme);
          
          // Create folder if needed
          const themePath = path.join(process.cwd(), 'public', 'images', 'backgrounds', theme.folder_name);
          if (!fs.existsSync(themePath)) {
            fs.mkdirSync(themePath, { recursive: true });
          }
          
          // Fetch images for this theme
          const imagesResponse = await fetch(
            `${this.DIRECTUS_URL}/items/background_images?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
            { headers }
          );
          
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            const backgroundImages = [];
            console.log(`Found ${imagesData.data?.length || 0} background images for theme ${theme.folder_name}`);
            
            for (const img of imagesData.data || []) {
              const fileName = img.image_file?.filename_download || `${img.file_name}.png`;
              
              // Download if there's an uploaded file
              if (img.image_file?.id) {
                const targetPath = path.join(themePath, fileName);
                
                if (!fs.existsSync(targetPath)) {
                  try {
                    const imgResponse = await fetch(
                      `${this.DIRECTUS_URL}/assets/${img.image_file.id}`,
                      { headers }
                    );
                    if (imgResponse.ok) {
                      const buffer = await imgResponse.arrayBuffer();
                      fs.writeFileSync(targetPath, Buffer.from(buffer));
                      console.log(`✅ Downloaded background: ${theme.folder_name}/${fileName}`);
                    }
                  } catch (error) {
                    console.error(`Failed to download background ${fileName}`);
                  }
                }
              }
              
              // Use Directus proxy for images
              // Only use Directus files - NO FALLBACK
              if (!img.image_file?.id) {
                console.log(`Skipping background ${img.file_name} - no Directus file`);
                continue;
              }
              const imagePath = `/api/directus-image?id=${img.image_file.id}`;

              backgroundImages.push({
                name: img.file_name,
                path: imagePath,
                url: imagePath,
                translations: img.translations || {}
              });
            }
            
            this.state.backgrounds.set(theme.folder_name, backgroundImages);
          }

          // Always include filesystem files
          const fsThemePath = path.join(process.cwd(), 'public', 'images', 'backgrounds', theme.folder_name);
          // NO FILESYSTEM FALLBACK - Only use Directus
        }
      }
      
      // Sync border styles first
      const borderStylesResponse = await fetch(
        `${this.DIRECTUS_URL}/items/border_styles?filter[is_active][_eq]=true&sort=sort_order`,
        { headers }
      );
      
      if (borderStylesResponse.ok) {
        const borderStylesData = await borderStylesResponse.json();
        console.log(`Syncing ${borderStylesData.data?.length || 0} border styles`);
        
        for (const style of borderStylesData.data || []) {
          this.state.borderStyles.set(style.style_name, style);
          
          // Create folder if needed
          const stylePath = path.join(process.cwd(), 'public', 'images', 'borders', style.style_name);
          if (!fs.existsSync(stylePath)) {
            fs.mkdirSync(stylePath, { recursive: true });
          }
          
          // Fetch images for this style
          const imagesResponse = await fetch(
            `${this.DIRECTUS_URL}/items/border_images?filter[style_id][_eq]=${style.id}&filter[status][_eq]=active&fields=*,image_file.*`,
            { headers }
          );
          
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            const borderImages = [];
            console.log(`Found ${imagesData.data?.length || 0} border images for style ${style.style_name}`);
            
            for (const img of imagesData.data || []) {
              const fileName = img.image_file?.filename_download || `${img.file_name}.png`;
              
              // Download if there's an uploaded file
              if (img.image_file?.id) {
                const targetPath = path.join(stylePath, fileName);
                
                if (!fs.existsSync(targetPath)) {
                  try {
                    const imgResponse = await fetch(
                      `${this.DIRECTUS_URL}/assets/${img.image_file.id}`,
                      { headers }
                    );
                    if (imgResponse.ok) {
                      const buffer = await imgResponse.arrayBuffer();
                      fs.writeFileSync(targetPath, Buffer.from(buffer));
                      console.log(`✅ Downloaded border: ${style.style_name}/${fileName}`);
                    }
                  } catch (error) {
                    console.error(`Failed to download border ${fileName}`);
                  }
                }
              }
              
              // Use Directus proxy for images
              // Only use Directus files - NO FALLBACK
              if (!img.image_file?.id) {
                console.log(`Skipping border ${img.file_name} - no Directus file`);
                continue;
              }
              const imagePath = `/api/directus-image?id=${img.image_file.id}`;

              borderImages.push({
                name: img.file_name,
                path: imagePath,
                url: imagePath,
                translations: img.translations || {}
              });
            }
            
            this.state.borders.set(style.style_name, borderImages);
          }

          // Always include filesystem files
          const fsStylePath = path.join(process.cwd(), 'public', 'images', 'borders', style.style_name);
          // NO FILESYSTEM FALLBACK - Only use Directus
        }
      }

      console.log(`Border state after sync:`, Array.from(this.state.borders.keys()),
        Array.from(this.state.borders.entries()).map(([k, v]) => `${k}: ${v.length} images`));
      
      // Sync templates
      const templateResponse = await fetch(
        `${this.DIRECTUS_URL}/items/worksheet_templates?filter[is_active][_eq]=true&sort=sort_order&fields=*,template_image.*`,
        { headers }
      );
      
      if (templateResponse.ok) {
        const templateData = await templateResponse.json();
        const templatesByType = new Map<string, any[]>();
        
        for (const template of templateData.data || []) {
          const appType = template.app_type || 'general';
          if (!templatesByType.has(appType)) {
            templatesByType.set(appType, []);
          }
          
          const templates = templatesByType.get(appType)!;
          templates.push({
            name: template.name,
            url: template.template_image?.id ? `/assets/${template.template_image.id}` : null,
            description: template.description,
            config: template.config,
            appType: appType
          });
          
          // Download template image if needed
          if (template.template_image?.id) {
            const templatePath = path.join(process.cwd(), 'public', 'images', 'template');
            if (!fs.existsSync(templatePath)) {
              fs.mkdirSync(templatePath, { recursive: true });
            }
            
            const fileName = template.template_image.filename_download || `${template.name}.png`;
            const targetPath = path.join(templatePath, fileName);
            
            if (!fs.existsSync(targetPath)) {
              try {
                const imgResponse = await fetch(
                  `${this.DIRECTUS_URL}/assets/${template.template_image.id}`,
                  { headers }
                );
                if (imgResponse.ok) {
                  const buffer = await imgResponse.arrayBuffer();
                  fs.writeFileSync(targetPath, Buffer.from(buffer));
                  console.log(`✅ Downloaded template: ${fileName}`);
                }
              } catch (error) {
                console.error(`Failed to download template ${fileName}`);
              }
            }
          }
        }
        
        this.state.templates = templatesByType;
      }
      
      // Sync train templates
      await this.syncTrainTemplates(headers);
      
      // Sync worksheet templates
      await this.syncWorksheetTemplates(headers);
      
      console.log(`📦 Synced special images: ${this.state.backgrounds.size} background categories, ${this.state.borders.size} border styles, ${this.state.trainTemplates.size} train templates, ${this.state.worksheetTemplates.size} worksheet templates`);
      
    } catch (error) {
      console.error('Failed to sync special images:', error);
    }
  }
  
  // Get background themes
  getBackgroundThemes(locale: string = 'en'): any[] {
    const themes: any[] = [];
    for (const [themeName, theme] of this.state.backgroundThemes.entries()) {
      let displayName = themeName;
      if (theme.translations?.[locale]) {
        displayName = theme.translations[locale];
      } else if (theme.translations?.['en']) {
        displayName = theme.translations['en'];
      }
      
      themes.push({
        name: themeName,
        displayName: displayName,
        translations: theme.translations || {},
        imageCount: this.state.backgrounds.get(themeName)?.length || 0
      });
    }
    return themes;
  }
  
  // Get backgrounds by category
  getBackgrounds(category?: string): any[] {
    if (!category) {
      // Return all backgrounds
      const all: any[] = [];
      for (const [cat, bgs] of this.state.backgrounds.entries()) {
        all.push(...bgs);
      }
      return all;
    }
    return this.state.backgrounds.get(category) || [];
  }
  
  // Get border styles
  getBorderStyles(locale: string = 'en'): any[] {
    console.log('getBorderStyles called with locale:', locale);
    console.log('borderStyles size:', this.state.borderStyles.size);
    console.log('Border styles keys:', Array.from(this.state.borderStyles.keys()));
    const styles: any[] = [];
    for (const [styleName, style] of this.state.borderStyles.entries()) {
      console.log(`Processing ${styleName}, style data:`, JSON.stringify(style));
      let displayName = styleName;
      if (style.translations?.[locale]) {
        displayName = style.translations[locale];
        console.log(`Found ${locale} translation: ${displayName}`);
      } else if (style.translations?.['en']) {
        displayName = style.translations['en'];
        console.log(`Using English fallback: ${displayName}`);
      }
      
      styles.push({
        name: styleName,
        displayName: displayName,
        translations: style.translations || {},
        imageCount: this.state.borders.get(styleName)?.length || 0
      });
    }
    return styles;
  }
  
  // Get borders by style
  getBorders(style?: string): any[] {
    if (!style) {
      // Return all borders
      const all: any[] = [];
      for (const [s, borders] of this.state.borders.entries()) {
        all.push(...borders);
      }
      return all;
    }
    return this.state.borders.get(style) || [];
  }
  
  // Get templates by app type (legacy)
  getTemplates(appType?: string): any[] {
    if (!appType) {
      // Return all templates
      const all: any[] = [];
      for (const [type, templates] of this.state.templates.entries()) {
        all.push(...templates);
      }
      return all;
    }
    return this.state.templates.get(appType) || [];
  }
  
  // Sync train templates
  private async syncTrainTemplates(headers: any): Promise<void> {
    console.log('Starting syncTrainTemplates...');
    try {
      // Sync train template themes
      const trainThemesResponse = await fetch(
        `${this.DIRECTUS_URL}/items/train_template_themes?filter[is_active][_eq]=true&sort=sort_order`,
        { headers }
      );
      
      if (trainThemesResponse.ok) {
        const trainThemesData = await trainThemesResponse.json();
        console.log(`Syncing ${trainThemesData.data?.length || 0} train template themes`);
        
        for (const theme of trainThemesData.data || []) {
          this.state.trainTemplateThemes.set(theme.folder_name, theme);
          console.log(`Added train theme: ${theme.folder_name}`);
          
          // Create folder if needed
          const themePath = path.join(process.cwd(), 'public', 'images', 'train_templates', theme.folder_name);
          if (!fs.existsSync(themePath)) {
            fs.mkdirSync(themePath, { recursive: true });
          }
          
          // Fetch images for this theme
          const imagesResponse = await fetch(
            `${this.DIRECTUS_URL}/items/train_template_images?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
            { headers }
          );
          
          console.log(`Fetching train images for theme ${theme.id}: ${imagesResponse.status}`);
          
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            const templateImages = [];
            console.log(`Found ${imagesData.data?.length || 0} train images for theme ${theme.folder_name}`);
            
            for (const img of imagesData.data || []) {
              const fileName = img.image_file?.filename_download || `${img.file_name}.png`;
              
              // If there's an uploaded file, download it
              if (img.image_file?.id) {
                const targetPath = path.join(themePath, fileName);
                
                // Download if doesn't exist
                if (!fs.existsSync(targetPath)) {
                  try {
                    const imgResponse = await fetch(
                      `${this.DIRECTUS_URL}/assets/${img.image_file.id}`,
                      { headers }
                    );
                    if (imgResponse.ok) {
                      const buffer = await imgResponse.arrayBuffer();
                      fs.writeFileSync(targetPath, Buffer.from(buffer));
                      console.log(`✅ Downloaded train template: ${theme.folder_name}/${fileName}`);
                    }
                  } catch (error) {
                    console.error(`Failed to download train template ${fileName}`);
                  }
                }
              }
              
              // Use Directus image path if available, otherwise skip
              if (img.image_file?.id) {
                const imagePath = `/api/directus-image?id=${img.image_file.id}`;
                templateImages.push({
                  name: img.file_name,
                  path: imagePath,
                  url: imagePath,
                  translations: img.translations || {}
                });
              }
            }
            
            this.state.trainTemplates.set(theme.folder_name, templateImages);
            console.log(`Set ${templateImages.length} templates for train theme ${theme.folder_name}`);
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync train templates:', error);
    }
  }
  
  // Sync worksheet templates
  private async syncWorksheetTemplates(headers: any): Promise<void> {
    try {
      // Sync worksheet template themes
      const worksheetThemesResponse = await fetch(
        `${this.DIRECTUS_URL}/items/worksheet_template_themes?filter[is_active][_eq]=true&sort=sort_order`,
        { headers }
      );
      
      if (worksheetThemesResponse.ok) {
        const worksheetThemesData = await worksheetThemesResponse.json();
        
        for (const theme of worksheetThemesData.data || []) {
          this.state.worksheetTemplateThemes.set(theme.folder_name, theme);
          
          // Create folder if needed
          const themePath = path.join(process.cwd(), 'public', 'images', 'worksheet_templates', theme.folder_name);
          if (!fs.existsSync(themePath)) {
            fs.mkdirSync(themePath, { recursive: true });
          }
          
          // Fetch images for this theme
          const imagesResponse = await fetch(
            `${this.DIRECTUS_URL}/items/worksheet_template_images?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
            { headers }
          );
          
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            const templateImages = [];
            
            for (const img of imagesData.data || []) {
              const fileName = img.image_file?.filename_download || `${img.file_name}.png`;
              
              // If there's an uploaded file, download it
              if (img.image_file?.id) {
                const targetPath = path.join(themePath, fileName);
                
                // Download if doesn't exist
                if (!fs.existsSync(targetPath)) {
                  try {
                    const imgResponse = await fetch(
                      `${this.DIRECTUS_URL}/assets/${img.image_file.id}`,
                      { headers }
                    );
                    if (imgResponse.ok) {
                      const buffer = await imgResponse.arrayBuffer();
                      fs.writeFileSync(targetPath, Buffer.from(buffer));
                      console.log(`✅ Downloaded worksheet template: ${theme.folder_name}/${fileName}`);
                    }
                  } catch (error) {
                    console.error(`Failed to download worksheet template ${fileName}`);
                  }
                }
              }
              
              // Use Directus image path if available, otherwise skip
              if (img.image_file?.id) {
                const imagePath = `/api/directus-image?id=${img.image_file.id}`;
                templateImages.push({
                  name: img.file_name,
                  path: imagePath,
                  url: imagePath,
                  translations: img.translations || {}
                });
              }
            }
            
            this.state.worksheetTemplates.set(theme.folder_name, templateImages);
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync worksheet templates:', error);
    }
  }
  
  // Get train templates for Alphabet Train and Pattern Train apps
  getTrainTemplates(locale: string = 'en'): any[] {
    const allTemplates: any[] = [];
    
    console.log(`Getting train templates, state has ${this.state.trainTemplates.size} themes`);
    
    // Get from synced data
    for (const [themeName, templates] of this.state.trainTemplates.entries()) {
      const theme = this.state.trainTemplateThemes.get(themeName);
      console.log(`Processing theme ${themeName} with ${templates.length} templates`);
      
      for (const template of templates) {
        let displayName = template.name;
        
        // Use translations if available
        if (template.translations?.[locale]) {
          displayName = template.translations[locale];
        } else if (template.translations?.['en']) {
          displayName = template.translations['en'];
        }
        
        allTemplates.push({
          ...template,
          name: displayName,
          theme: theme?.translations?.[locale] || theme?.translations?.['en'] || themeName
        });
      }
    }
    
    // Fallback to filesystem if no synced data
    if (allTemplates.length === 0) {
      const templatesPath = path.join(process.cwd(), 'public', 'images', 'train_templates');
      if (fs.existsSync(templatesPath)) {
        const dirs = fs.readdirSync(templatesPath, { withFileTypes: true })
          .filter(d => d.isDirectory());
        
        for (const dir of dirs) {
          const themePath = path.join(templatesPath, dir.name);
          const files = fs.readdirSync(themePath)
            .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));
          
          for (const file of files) {
            allTemplates.push({
              name: file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, ''),
              path: `/images/train_templates/${dir.name}/${file}`,
              url: `/images/train_templates/${dir.name}/${file}`,
              theme: dir.name,
              type: 'train'
            });
          }
        }
      }
    }
    
    return allTemplates;
  }
  
  // Get worksheet templates for Prepositions app
  getWorksheetTemplates(locale: string = 'en'): any[] {
    const allTemplates: any[] = [];
    
    // Get from synced data
    for (const [themeName, templates] of this.state.worksheetTemplates.entries()) {
      const theme = this.state.worksheetTemplateThemes.get(themeName);
      
      for (const template of templates) {
        let displayName = template.name;
        
        // Use translations if available
        if (template.translations?.[locale]) {
          displayName = template.translations[locale];
        } else if (template.translations?.['en']) {
          displayName = template.translations['en'];
        }
        
        allTemplates.push({
          ...template,
          name: displayName,
          theme: theme?.translations?.[locale] || theme?.translations?.['en'] || themeName
        });
      }
    }
    
    // Fallback to filesystem if no synced data
    if (allTemplates.length === 0) {
      const templatesPath = path.join(process.cwd(), 'public', 'images', 'worksheet_templates');
      if (fs.existsSync(templatesPath)) {
        const dirs = fs.readdirSync(templatesPath, { withFileTypes: true })
          .filter(d => d.isDirectory());
        
        for (const dir of dirs) {
          const themePath = path.join(templatesPath, dir.name);
          const files = fs.readdirSync(themePath)
            .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));
          
          for (const file of files) {
            allTemplates.push({
              name: file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, ''),
              path: `/images/worksheet_templates/${dir.name}/${file}`,
              url: `/images/worksheet_templates/${dir.name}/${file}`,
              theme: dir.name,
              type: 'worksheet'
            });
          }
        }
      }
    }
    
    return allTemplates;
  }
}

export default ImageLibraryManager.getInstance();