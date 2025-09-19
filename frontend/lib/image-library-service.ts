// Unified Image Library Service
// This service handles all image library operations between Directus and the frontend

import fs from 'fs';
import path from 'path';

// Use correct container name when running in Docker
const DIRECTUS_URL = process.env.DIRECTUS_INTERNAL_URL || 'http://lcs-directus:8055';
const DIRECTUS_PUBLIC_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

interface Theme {
  id: number;
  folder_name: string;
  name: Record<string, string>;
  sort_order: number;
  is_active: boolean;
}

interface WorksheetImage {
  id: number;
  file_name: string;
  name: Record<string, string>;
  theme_id: Theme | number;
  image_file: any;
  status: string;
}

export class ImageLibraryService {
  private static instance: ImageLibraryService;
  private accessToken: string | null = null;

  private constructor() {}

  static getInstance(): ImageLibraryService {
    if (!ImageLibraryService.instance) {
      ImageLibraryService.instance = new ImageLibraryService();
    }
    return ImageLibraryService.instance;
  }

  // Authenticate with Directus (server-side only)
  private async authenticate(): Promise<string | null> {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@lessoncraftstudio.com',
          password: 'admin123!'
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.data.access_token;
        return this.accessToken;
      }
    } catch (error) {
      console.log('Directus authentication failed, using filesystem fallback');
    }

    return '';
  }

  // Get all themes with translations
  async getThemes(locale: string = 'en'): Promise<any[]> {
    // Try Directus first
    try {
      const token = await this.authenticate();
      if (token) {
        const response = await fetch(`${DIRECTUS_URL}/items/image_themes?filter[is_active][_eq]=true&sort=sort_order`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Ensure themes exist in filesystem
          await this.syncThemesToFilesystem(data.data);
          
          return data.data.map((theme: Theme) => ({
            value: theme.folder_name,
            displayName: theme.name?.[locale] || theme.name?.['en'] || theme.folder_name,
            sortOrder: theme.sort_order
          }));
        }
      }
    } catch (error) {
      console.log('Using filesystem fallback for themes');
    }

    // Fallback to filesystem
    return this.getThemesFromFilesystem(locale);
  }

  // Get images for a theme with translations
  async getThemeImages(theme: string, locale: string = 'en'): Promise<any[]> {
    // Try Directus first
    try {
      const token = await this.authenticate();
      if (token) {
        const response = await fetch(
          `${DIRECTUS_URL}/items/worksheet_images?filter[theme_id][folder_name][_eq]=${theme}&filter[status][_eq]=active&fields=*,image_file.*`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (response.ok) {
          const data = await response.json();
          
          // Ensure images exist in filesystem
          await this.syncImagesToFilesystem(theme, data.data);
          
          return data.data.map((img: WorksheetImage) => {
            const fileName = this.ensureFileExtension(img.file_name);
            return {
              path: `/images/${theme}/${fileName}`,
              url: `/images/${theme}/${fileName}`,
              name: img.name?.[locale] || img.name?.['en'] || this.formatImageName(fileName),
              word: img.name?.[locale] || img.name?.['en'] || this.formatImageName(fileName)
            };
          });
        }
      }
    } catch (error) {
      console.log('Using filesystem fallback for images');
    }

    // Fallback to filesystem
    return this.getImagesFromFilesystem(theme, locale);
  }

  // Sync themes from Directus to filesystem
  private async syncThemesToFilesystem(themes: Theme[]): Promise<void> {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    for (const theme of themes) {
      const themePath = path.join(imagesDir, theme.folder_name);
      
      if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath, { recursive: true });
        console.log(`Created theme folder: ${theme.folder_name}`);
      }
    }
  }

  // Sync images from Directus to filesystem
  private async syncImagesToFilesystem(theme: string, images: WorksheetImage[]): Promise<void> {
    const themePath = path.join(process.cwd(), 'public', 'images', theme);
    
    if (!fs.existsSync(themePath)) {
      fs.mkdirSync(themePath, { recursive: true });
    }

    const token = await this.authenticate();
    if (!token) return;

    for (const image of images) {
      if (!image.image_file?.id) continue;
      
      const fileName = this.ensureFileExtension(image.file_name);
      const targetPath = path.join(themePath, fileName);
      
      // Skip if file already exists
      if (fs.existsSync(targetPath)) continue;
      
      try {
        // Download from Directus
        const response = await fetch(`${DIRECTUS_URL}/assets/${image.image_file.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          fs.writeFileSync(targetPath, Buffer.from(buffer));
          console.log(`Synced image: ${theme}/${fileName}`);
        }
      } catch (error) {
        console.error(`Failed to sync ${fileName}:`, error);
      }
    }
  }

  // Ensure file has an extension
  private ensureFileExtension(fileName: string): string {
    if (!fileName) return 'unnamed.png';
    
    // Check if it already has an extension
    const hasExtension = /\.(png|jpg|jpeg|gif|svg)$/i.test(fileName);
    
    if (!hasExtension) {
      // Default to .png if no extension
      return `${fileName}.png`;
    }
    
    return fileName;
  }

  // Format image name for display
  private formatImageName(fileName: string): string {
    return fileName
      .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fallback: Get themes from filesystem
  private async getThemesFromFilesystem(locale: string): Promise<any[]> {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      return [];
    }

    const files = fs.readdirSync(imagesDir, { withFileTypes: true });
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg', 'background'];
    
    const themes = files
      .filter(file => file.isDirectory() && !excludedFolders.includes(file.name))
      .map(file => {
        let displayName = this.getThemeTranslation(file.name, locale);
        
        // Check if theme has a translations file
        const translationsPath = path.join(imagesDir, file.name, 'translations.json');
        if (fs.existsSync(translationsPath)) {
          try {
            const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));
            if (translations.name?.[locale]) {
              displayName = translations.name[locale];
            } else if (translations.name?.['en']) {
              displayName = translations.name['en'];
            }
          } catch (error) {
            // Use default translation
          }
        }
        
        return {
          value: file.name,
          displayName: displayName
        };
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName, locale));
    
    return themes;
  }

  // Fallback: Get images from filesystem
  private async getImagesFromFilesystem(theme: string, locale: string): Promise<any[]> {
    const themePath = path.join(process.cwd(), 'public', 'images', theme);
    
    if (!fs.existsSync(themePath)) {
      return [];
    }

    // Load translations file if it exists
    let themeTranslations: any = null;
    const translationsPath = path.join(themePath, 'translations.json');
    if (fs.existsSync(translationsPath)) {
      try {
        const translationsContent = fs.readFileSync(translationsPath, 'utf-8');
        themeTranslations = JSON.parse(translationsContent);
      } catch (error) {
        console.log('Failed to load translations for', theme);
      }
    }

    const files = fs.readdirSync(themePath);
    const imageExtensions = /\.(png|jpg|jpeg|gif|svg)$/i;
    
    return files
      .filter(file => imageExtensions.test(file) && file !== 'translations.json')
      .map(file => {
        const imageKey = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
        let imageName = this.getImageTranslation(file, locale);
        
        // Override with Directus translations if available
        if (themeTranslations?.images?.[imageKey]?.[locale]) {
          imageName = themeTranslations.images[imageKey][locale];
        } else if (themeTranslations?.images?.[imageKey]?.['en']) {
          imageName = themeTranslations.images[imageKey]['en'];
        }
        
        return {
          path: `/images/${theme}/${file}`,
          url: `/images/${theme}/${file}`,
          name: imageName,
          word: imageName
        };
      });
  }

  // Get theme translation with full multilingual support
  private getThemeTranslation(themeName: string, locale: string): string {
    // Comprehensive theme translations
    const themeTranslations: Record<string, Record<string, string>> = {
      'alphabet': { en: 'Alphabet', de: 'Alphabet', fr: 'Alphabet', es: 'Alfabeto', pt: 'Alfabeto', it: 'Alfabeto', nl: 'Alfabet', sv: 'Alfabet', da: 'Alfabet', no: 'Alfabet', fi: 'Aakkoset' },
      'animals': { en: 'Animals', de: 'Tiere', fr: 'Animaux', es: 'Animales', pt: 'Animais', it: 'Animali', nl: 'Dieren', sv: 'Djur', da: 'Dyr', no: 'Dyr', fi: 'Eläimet' },
      'food': { en: 'Food', de: 'Essen', fr: 'Nourriture', es: 'Comida', pt: 'Comida', it: 'Cibo', nl: 'Voedsel', sv: 'Mat', da: 'Mad', no: 'Mat', fi: 'Ruoka' },
      'furniture': { en: 'Furniture', de: 'Möbel', fr: 'Meubles', es: 'Muebles', pt: 'Móveis', it: 'Mobili', nl: 'Meubels', sv: 'Möbler', da: 'Møbler', no: 'Møbler', fi: 'Huonekalut' },
      'coloring': { en: 'Coloring', de: 'Ausmalen', fr: 'Coloriage', es: 'Colorear', pt: 'Colorir', it: 'Colorare', nl: 'Kleuren', sv: 'Färgläggning', da: 'Farvelægning', no: 'Fargelegging', fi: 'Värittäminen' },
      'general': { en: 'General', de: 'Allgemein', fr: 'Général', es: 'General', pt: 'Geral', it: 'Generale', nl: 'Algemeen', sv: 'Allmänt', da: 'Generelt', no: 'Generelt', fi: 'Yleinen' },
      'icons': { en: 'Icons', de: 'Symbole', fr: 'Icônes', es: 'Iconos', pt: 'Ícones', it: 'Icone', nl: 'Pictogrammen', sv: 'Ikoner', da: 'Ikoner', no: 'Ikoner', fi: 'Kuvakkeet' },
      'prepositions': { en: 'Prepositions', de: 'Präpositionen', fr: 'Prépositions', es: 'Preposiciones', pt: 'Preposições', it: 'Preposizioni', nl: 'Voorzetsels', sv: 'Prepositioner', da: 'Præpositioner', no: 'Preposisjoner', fi: 'Prepositiot' },
      'symbols': { en: 'Symbols', de: 'Symbole', fr: 'Symboles', es: 'Símbolos', pt: 'Símbolos', it: 'Simboli', nl: 'Symbolen', sv: 'Symboler', da: 'Symboler', no: 'Symboler', fi: 'Symbolit' },
      'transportation': { en: 'Transportation', de: 'Transport', fr: 'Transport', es: 'Transporte', pt: 'Transporte', it: 'Trasporti', nl: 'Vervoer', sv: 'Transport', da: 'Transport', no: 'Transport', fi: 'Liikenne' },
      'nature': { en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza', pt: 'Natureza', it: 'Natura', nl: 'Natuur', sv: 'Natur', da: 'Natur', no: 'Natur', fi: 'Luonto' },
      'school': { en: 'School', de: 'Schule', fr: 'École', es: 'Escuela', pt: 'Escola', it: 'Scuola', nl: 'School', sv: 'Skola', da: 'Skole', no: 'Skole', fi: 'Koulu' },
      'sports': { en: 'Sports', de: 'Sport', fr: 'Sports', es: 'Deportes', pt: 'Esportes', it: 'Sport', nl: 'Sport', sv: 'Sport', da: 'Sport', no: 'Sport', fi: 'Urheilu' },
      'colors': { en: 'Colors', de: 'Farben', fr: 'Couleurs', es: 'Colores', pt: 'Cores', it: 'Colori', nl: 'Kleuren', sv: 'Färger', da: 'Farver', no: 'Farger', fi: 'Värit' },
      'shapes': { en: 'Shapes', de: 'Formen', fr: 'Formes', es: 'Formas', pt: 'Formas', it: 'Forme', nl: 'Vormen', sv: 'Former', da: 'Former', no: 'Former', fi: 'Muodot' },
      'weather': { en: 'Weather', de: 'Wetter', fr: 'Météo', es: 'Clima', pt: 'Clima', it: 'Meteo', nl: 'Weer', sv: 'Väder', da: 'Vejr', no: 'Vær', fi: 'Sää' },
      'emotions': { en: 'Emotions', de: 'Emotionen', fr: 'Émotions', es: 'Emociones', pt: 'Emoções', it: 'Emozioni', nl: 'Emoties', sv: 'Känslor', da: 'Følelser', no: 'Følelser', fi: 'Tunteet' },
      'body': { en: 'Body Parts', de: 'Körperteile', fr: 'Corps', es: 'Cuerpo', pt: 'Corpo', it: 'Corpo', nl: 'Lichaam', sv: 'Kropp', da: 'Krop', no: 'Kropp', fi: 'Keho' },
      'clothing': { en: 'Clothing', de: 'Kleidung', fr: 'Vêtements', es: 'Ropa', pt: 'Roupas', it: 'Abbigliamento', nl: 'Kleding', sv: 'Kläder', da: 'Tøj', no: 'Klær', fi: 'Vaatteet' },
      'household': { en: 'Household', de: 'Haushalt', fr: 'Maison', es: 'Hogar', pt: 'Casa', it: 'Casa', nl: 'Huishouden', sv: 'Hushåll', da: 'Husholdning', no: 'Husholdning', fi: 'Koti' },
      'toys': { en: 'Toys', de: 'Spielzeug', fr: 'Jouets', es: 'Juguetes', pt: 'Brinquedos', it: 'Giocattoli', nl: 'Speelgoed', sv: 'Leksaker', da: 'Legetøj', no: 'Leker', fi: 'Lelut' },
      'music': { en: 'Music', de: 'Musik', fr: 'Musique', es: 'Música', pt: 'Música', it: 'Musica', nl: 'Muziek', sv: 'Musik', da: 'Musik', no: 'Musikk', fi: 'Musiikki' },
      'jobs': { en: 'Jobs', de: 'Berufe', fr: 'Métiers', es: 'Trabajos', pt: 'Profissões', it: 'Lavori', nl: 'Beroepen', sv: 'Yrken', da: 'Job', no: 'Yrker', fi: 'Ammatit' },
      'space': { en: 'Space', de: 'Weltraum', fr: 'Espace', es: 'Espacio', pt: 'Espaço', it: 'Spazio', nl: 'Ruimte', sv: 'Rymden', da: 'Rum', no: 'Rommet', fi: 'Avaruus' },
      'seasons': { en: 'Seasons', de: 'Jahreszeiten', fr: 'Saisons', es: 'Estaciones', pt: 'Estações', it: 'Stagioni', nl: 'Seizoenen', sv: 'Årstider', da: 'Årstider', no: 'Årstider', fi: 'Vuodenajat' },
      'holidays': { en: 'Holidays', de: 'Feiertage', fr: 'Vacances', es: 'Vacaciones', pt: 'Feriados', it: 'Vacanze', nl: 'Vakanties', sv: 'Helgdagar', da: 'Helligdage', no: 'Helligdager', fi: 'Lomat' }
    };
    
    // Check if we have translations for this theme
    if (themeTranslations[themeName.toLowerCase()]) {
      return themeTranslations[themeName.toLowerCase()][locale] || 
             themeTranslations[themeName.toLowerCase()]['en'] || 
             this.formatImageName(themeName);
    }
    
    // Fallback to formatted name
    return this.formatImageName(themeName);
  }

  // Get image translation with full multilingual support
  private getImageTranslation(fileName: string, locale: string): string {
    const baseName = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
    
    // Comprehensive image translations
    const imageTranslations: Record<string, Record<string, string>> = {
      // Animals
      'cat': { en: 'Cat', de: 'Katze', fr: 'Chat', es: 'Gato', pt: 'Gato', it: 'Gatto', nl: 'Kat', sv: 'Katt', da: 'Kat', no: 'Katt', fi: 'Kissa' },
      'dog': { en: 'Dog', de: 'Hund', fr: 'Chien', es: 'Perro', pt: 'Cão', it: 'Cane', nl: 'Hond', sv: 'Hund', da: 'Hund', no: 'Hund', fi: 'Koira' },
      'bird': { en: 'Bird', de: 'Vogel', fr: 'Oiseau', es: 'Pájaro', pt: 'Pássaro', it: 'Uccello', nl: 'Vogel', sv: 'Fågel', da: 'Fugl', no: 'Fugl', fi: 'Lintu' },
      'fish': { en: 'Fish', de: 'Fisch', fr: 'Poisson', es: 'Pez', pt: 'Peixe', it: 'Pesce', nl: 'Vis', sv: 'Fisk', da: 'Fisk', no: 'Fisk', fi: 'Kala' },
      'rabbit': { en: 'Rabbit', de: 'Kaninchen', fr: 'Lapin', es: 'Conejo', pt: 'Coelho', it: 'Coniglio', nl: 'Konijn', sv: 'Kanin', da: 'Kanin', no: 'Kanin', fi: 'Kani' },
      'horse': { en: 'Horse', de: 'Pferd', fr: 'Cheval', es: 'Caballo', pt: 'Cavalo', it: 'Cavallo', nl: 'Paard', sv: 'Häst', da: 'Hest', no: 'Hest', fi: 'Hevonen' },
      
      // Food
      'apple': { en: 'Apple', de: 'Apfel', fr: 'Pomme', es: 'Manzana', pt: 'Maçã', it: 'Mela', nl: 'Appel', sv: 'Äpple', da: 'Æble', no: 'Eple', fi: 'Omena' },
      'banana': { en: 'Banana', de: 'Banane', fr: 'Banane', es: 'Plátano', pt: 'Banana', it: 'Banana', nl: 'Banaan', sv: 'Banan', da: 'Banan', no: 'Banan', fi: 'Banaani' },
      'bread': { en: 'Bread', de: 'Brot', fr: 'Pain', es: 'Pan', pt: 'Pão', it: 'Pane', nl: 'Brood', sv: 'Bröd', da: 'Brød', no: 'Brød', fi: 'Leipä' },
      'cheese': { en: 'Cheese', de: 'Käse', fr: 'Fromage', es: 'Queso', pt: 'Queijo', it: 'Formaggio', nl: 'Kaas', sv: 'Ost', da: 'Ost', no: 'Ost', fi: 'Juusto' },
      'milk': { en: 'Milk', de: 'Milch', fr: 'Lait', es: 'Leche', pt: 'Leite', it: 'Latte', nl: 'Melk', sv: 'Mjölk', da: 'Mælk', no: 'Melk', fi: 'Maito' },
      
      // Furniture  
      'chair': { en: 'Chair', de: 'Stuhl', fr: 'Chaise', es: 'Silla', pt: 'Cadeira', it: 'Sedia', nl: 'Stoel', sv: 'Stol', da: 'Stol', no: 'Stol', fi: 'Tuoli' },
      'table': { en: 'Table', de: 'Tisch', fr: 'Table', es: 'Mesa', pt: 'Mesa', it: 'Tavolo', nl: 'Tafel', sv: 'Bord', da: 'Bord', no: 'Bord', fi: 'Pöytä' },
      'bed': { en: 'Bed', de: 'Bett', fr: 'Lit', es: 'Cama', pt: 'Cama', it: 'Letto', nl: 'Bed', sv: 'Säng', da: 'Seng', no: 'Seng', fi: 'Sänky' },
      'desk': { en: 'Desk', de: 'Schreibtisch', fr: 'Bureau', es: 'Escritorio', pt: 'Escrivaninha', it: 'Scrivania', nl: 'Bureau', sv: 'Skrivbord', da: 'Skrivebord', no: 'Skrivebord', fi: 'Kirjoituspöytä' },
      'sofa': { en: 'Sofa', de: 'Sofa', fr: 'Canapé', es: 'Sofá', pt: 'Sofá', it: 'Divano', nl: 'Bank', sv: 'Soffa', da: 'Sofa', no: 'Sofa', fi: 'Sohva' }
    };
    
    // Check if we have translations for this image
    if (imageTranslations[baseName]) {
      return imageTranslations[baseName][locale] || 
             imageTranslations[baseName]['en'] || 
             this.formatImageName(fileName);
    }
    
    // Fallback to formatted name
    return this.formatImageName(fileName);
  }
}

export default ImageLibraryService.getInstance();