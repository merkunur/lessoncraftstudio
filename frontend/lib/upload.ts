import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

// Get the true source directory (not standalone)
// In standalone mode, process.cwd() is .next/standalone, so we need to go up two levels
function getSourceRoot(): string {
  const cwd = process.cwd();

  // If we're in standalone mode, go up to the actual source root
  if (cwd.endsWith('.next/standalone') || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '../..');
  }

  return cwd;
}

const SOURCE_ROOT = getSourceRoot();

// Storage paths - always use source directory
// Pattern: Main images use /images/{theme}, special types use /images/{type}/{theme}
export const STORAGE_PATHS = {
  images: path.join(SOURCE_ROOT, 'public', 'images'),
  borders: path.join(SOURCE_ROOT, 'public', 'images', 'borders'),
  backgrounds: path.join(SOURCE_ROOT, 'public', 'images', 'backgrounds'),
  trainTemplates: path.join(SOURCE_ROOT, 'public', 'images', 'train-templates'),
  worksheetTemplates: path.join(SOURCE_ROOT, 'public', 'images', 'worksheet-templates'),
  worksheetSamples: path.join(SOURCE_ROOT, 'public', 'worksheet-samples'),
  blog: path.join(SOURCE_ROOT, 'public', 'blog', 'images'),
  blogPdfs: path.join(SOURCE_ROOT, 'public', 'blog', 'pdfs'),
  blogThumbnails: path.join(SOURCE_ROOT, 'public', 'blog', 'thumbnails'),
};

// Ensure all storage directories exist
export function initializeStorage() {
  Object.values(STORAGE_PATHS).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`[STORAGE INIT] Created directory: ${dir}`);
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

  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save file
  const filePath = path.join(dir, filename);
  await fs.promises.writeFile(filePath, buffer);
  console.log(`[FILE SAVE] Saved to: ${filePath}`);

  // Return public URL path (relative to public directory)
  const publicPath = filePath.replace(path.join(SOURCE_ROOT, 'public'), '').replace(/\\/g, '/');
  return publicPath;
}

// Delete file from disk
export async function deleteFile(publicPath: string): Promise<void> {
  const filePath = path.join(SOURCE_ROOT, 'public', publicPath);
  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
    console.log(`[FILE DELETE] Deleted: ${filePath}`);
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
