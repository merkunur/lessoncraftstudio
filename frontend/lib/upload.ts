import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

// Storage paths
export const STORAGE_PATHS = {
  images: path.join(process.cwd(), 'public', 'images'),
  borders: path.join(process.cwd(), 'public', 'images', 'borders'),
  backgrounds: path.join(process.cwd(), 'public', 'images', 'backgrounds'),
  trainTemplates: path.join(process.cwd(), 'public', 'images', 'train-templates'),
  worksheetTemplates: path.join(process.cwd(), 'public', 'images', 'worksheet-templates'),
  blog: path.join(process.cwd(), 'public', 'blog', 'images'),
  blogPdfs: path.join(process.cwd(), 'public', 'blog', 'pdfs'),
  blogThumbnails: path.join(process.cwd(), 'public', 'blog', 'thumbnails'),
};

// Get standalone path for a given source path (for production builds)
function getStandalonePath(sourcePath: string): string | null {
  const standalonePath = path.join(process.cwd(), '.next', 'standalone', 'public');

  // Check if standalone directory exists
  if (!fs.existsSync(standalonePath)) {
    return null;
  }

  // Replace the source public path with standalone public path
  return sourcePath.replace(
    path.join(process.cwd(), 'public'),
    standalonePath
  );
}

// Ensure all storage directories exist
export function initializeStorage() {
  Object.values(STORAGE_PATHS).forEach(dir => {
    // Create source directory
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`[STORAGE INIT] Created source directory: ${dir}`);
    }

    // Create standalone directory if standalone build exists
    const standalonePath = getStandalonePath(dir);
    if (standalonePath && !fs.existsSync(standalonePath)) {
      fs.mkdirSync(standalonePath, { recursive: true });
      console.log(`[STORAGE INIT] Created standalone directory: ${standalonePath}`);
    }
  });
}

// Allowed file types
export const ALLOWED_IMAGE_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
export const ALLOWED_PDF_TYPE = 'application/pdf';

// File validation
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only SVG, PNG, JPG, and WebP are allowed.' };
  }

  // Max 10MB
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File too large. Maximum size is 10MB.' };
  }

  return { valid: true };
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  if (file.type !== ALLOWED_PDF_TYPE) {
    return { valid: false, error: 'Invalid file type. Only PDF files are allowed.' };
  }

  // Max 50MB for PDFs
  if (file.size > 50 * 1024 * 1024) {
    return { valid: false, error: 'File too large. Maximum size is 50MB.' };
  }

  return { valid: true };
}

// Generate unique filename
export function generateUniqueFilename(originalName: string): string {
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${nameWithoutExt}-${timestamp}-${random}${ext}`;
}

// Optimize image (resize and convert to WebP if needed)
export async function optimizeImage(
  buffer: Buffer,
  mimeType: string,
  maxWidth: number = 800,
  maxHeight: number = 800
): Promise<{ buffer: Buffer; mimeType: string; width: number; height: number }> {
  // Don't optimize SVG files
  if (mimeType === 'image/svg+xml') {
    const metadata = await sharp(buffer).metadata();
    return {
      buffer,
      mimeType,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }

  // Optimize raster images
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Resize if needed
  if (metadata.width && metadata.width > maxWidth || metadata.height && metadata.height > maxHeight) {
    image.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert to WebP for better compression (except for PNG with transparency)
  const optimized = await image
    .webp({ quality: 85 })
    .toBuffer();

  const optimizedMetadata = await sharp(optimized).metadata();

  return {
    buffer: optimized,
    mimeType: 'image/webp',
    width: optimizedMetadata.width || 0,
    height: optimizedMetadata.height || 0,
  };
}

// Save file to disk
export async function saveFile(
  buffer: Buffer,
  filename: string,
  storageType: keyof typeof STORAGE_PATHS,
  subdir?: string
): Promise<string> {
  const baseDir = STORAGE_PATHS[storageType];
  const dir = subdir ? path.join(baseDir, subdir) : baseDir;

  // Ensure source directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save to source directory
  const filePath = path.join(dir, filename);
  await fs.promises.writeFile(filePath, buffer);
  console.log(`[FILE SAVE] Saved to source: ${filePath}`);

  // Also save to standalone directory if it exists
  const standaloneDir = getStandalonePath(dir);
  if (standaloneDir) {
    // Ensure standalone directory exists
    if (!fs.existsSync(standaloneDir)) {
      fs.mkdirSync(standaloneDir, { recursive: true });
    }

    const standaloneFilePath = path.join(standaloneDir, filename);
    await fs.promises.writeFile(standaloneFilePath, buffer);
    console.log(`[FILE SAVE] Saved to standalone: ${standaloneFilePath}`);
  }

  // Return public URL path
  const publicPath = filePath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
  return publicPath;
}

// Delete file from disk
export async function deleteFile(publicPath: string): Promise<void> {
  // Delete from source directory
  const filePath = path.join(process.cwd(), 'public', publicPath);
  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
    console.log(`[FILE DELETE] Deleted from source: ${filePath}`);
  }

  // Also delete from standalone directory if it exists
  const standalonePath = getStandalonePath(filePath);
  if (standalonePath && fs.existsSync(standalonePath)) {
    await fs.promises.unlink(standalonePath);
    console.log(`[FILE DELETE] Deleted from standalone: ${standalonePath}`);
  }
}

// Get file dimensions (for images)
export async function getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}
