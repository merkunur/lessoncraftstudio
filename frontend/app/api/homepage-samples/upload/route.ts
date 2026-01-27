import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Set immutable flag on a file to prevent accidental deletion
function setImmutable(filePath: string): void {
  try {
    execSync(`chattr +i "${filePath}"`, { stdio: 'ignore' });
  } catch {
    // Non-fatal if chattr not available (e.g., development environment)
  }
}

// Remove immutable flag before modifying a file
function removeImmutable(filePath: string): void {
  try {
    execSync(`chattr -i "${filePath}"`, { stdio: 'ignore' });
  } catch {
    // Non-fatal if chattr not available
  }
}

// Locale to language folder mapping
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Valid app IDs (33 apps)
const validAppIds = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'coloring', 'crossword', 'cryptogram', 'draw-and-color', 'drawing-lines',
  'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess',
  'word-scramble', 'wordsearch', 'writing'
];

// Base path for samples - production uses isolated storage at /var/www/lcs-media/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Valid file types for upload
const VALID_FILE_TYPES = ['thumbnail', 'pdf', 'hero-portrait', 'hero-landscape'];

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPE = 'application/pdf';

// Max file sizes
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB

interface UploadResult {
  success: boolean;
  message?: string;
  paths?: {
    original?: string;
    thumb?: string;
    preview?: string;
    pdf?: string;
  };
  error?: string;
}

async function ensureDirectoryExists(dir: string): Promise<void> {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`[HOMEPAGE-SAMPLES] Created directory: ${dir}`);
  }
}

async function createBackup(filePath: string): Promise<string | null> {
  try {
    await fs.access(filePath);
    // Remove immutable flag before backup
    removeImmutable(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.bak.${timestamp}`;
    await fs.copyFile(filePath, backupPath);
    console.log(`[HOMEPAGE-SAMPLES] Created backup: ${backupPath}`);
    return backupPath;
  } catch {
    // File doesn't exist, no backup needed
    return null;
  }
}

async function processImageUpload(
  buffer: Buffer,
  language: string,
  appId: string,
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, 'homepage');
  await ensureDirectoryExists(dir);

  const originalPath = path.join(dir, `${appId}-thumbnail.jpeg`);
  const thumbPath = path.join(dir, `${appId}-thumbnail_thumb.webp`);
  const previewPath = path.join(dir, `${appId}-thumbnail_preview.webp`);

  // Check if files exist
  let originalExists = false;
  try {
    await fs.access(originalPath);
    originalExists = true;
  } catch {
    // File doesn't exist
  }

  if (originalExists && !overwrite) {
    return {
      success: false,
      error: `File already exists: ${appId}-thumbnail.jpeg. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (originalExists && overwrite) {
    await createBackup(originalPath);
    await createBackup(thumbPath);
    await createBackup(previewPath);
  }

  try {
    // Save original JPEG
    await fs.writeFile(originalPath, buffer);
    setImmutable(originalPath);
    console.log(`[HOMEPAGE-SAMPLES] Saved original: ${originalPath}`);

    // Generate 400px thumbnail WebP
    const thumbBuffer = await sharp(buffer)
      .resize(400, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    await fs.writeFile(thumbPath, thumbBuffer);
    setImmutable(thumbPath);
    console.log(`[HOMEPAGE-SAMPLES] Generated thumb: ${thumbPath}`);

    // Generate 800px preview WebP
    const previewBuffer = await sharp(buffer)
      .resize(800, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    await fs.writeFile(previewPath, previewBuffer);
    setImmutable(previewPath);
    console.log(`[HOMEPAGE-SAMPLES] Generated preview: ${previewPath}`);

    // Verify files were created successfully
    const [origStats, thumbStats, previewStats] = await Promise.all([
      fs.stat(originalPath).catch(() => null),
      fs.stat(thumbPath).catch(() => null),
      fs.stat(previewPath).catch(() => null),
    ]);

    if (!previewStats || previewStats.size === 0) {
      console.error('[HOMEPAGE-SAMPLES] WebP preview generation failed or empty:', previewPath);
      return {
        success: false,
        error: 'WebP preview generation failed - file is empty or missing. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Image uploaded and WebP variants generated successfully',
      paths: {
        original: `/samples/${language}/homepage/${appId}-thumbnail.jpeg`,
        thumb: `/samples/${language}/homepage/${appId}-thumbnail_thumb.webp`,
        preview: `/samples/${language}/homepage/${appId}-thumbnail_preview.webp`
      },
      sizes: {
        original: origStats?.size || 0,
        thumb: thumbStats?.size || 0,
        preview: previewStats?.size || 0,
      }
    };
  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] Image processing error:', error);
    return {
      success: false,
      error: `Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function processPdfUpload(
  buffer: Buffer,
  language: string,
  appId: string,
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, 'homepage');
  await ensureDirectoryExists(dir);

  const pdfPath = path.join(dir, `${appId}-sample.pdf`);

  // Check if file exists
  let pdfExists = false;
  try {
    await fs.access(pdfPath);
    pdfExists = true;
  } catch {
    // File doesn't exist
  }

  if (pdfExists && !overwrite) {
    return {
      success: false,
      error: `File already exists: ${appId}-sample.pdf. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (pdfExists && overwrite) {
    await createBackup(pdfPath);
  }

  try {
    await fs.writeFile(pdfPath, buffer);
    setImmutable(pdfPath);
    console.log(`[HOMEPAGE-SAMPLES] Saved PDF: ${pdfPath}`);

    return {
      success: true,
      message: 'PDF uploaded successfully',
      paths: {
        pdf: `/samples/${language}/homepage/${appId}-sample.pdf`
      }
    };
  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] PDF save error:', error);
    return {
      success: false,
      error: `Failed to save PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function processHeroImageUpload(
  buffer: Buffer,
  language: string,
  orientation: 'portrait' | 'landscape',
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, 'homepage');
  await ensureDirectoryExists(dir);

  const originalPath = path.join(dir, `hero-${orientation}.jpeg`);
  const thumbPath = path.join(dir, `hero-${orientation}_thumb.webp`);
  const previewPath = path.join(dir, `hero-${orientation}_preview.webp`);

  // Check if files exist
  let originalExists = false;
  try {
    await fs.access(originalPath);
    originalExists = true;
  } catch {
    // File doesn't exist
  }

  if (originalExists && !overwrite) {
    return {
      success: false,
      error: `File already exists: hero-${orientation}.jpeg. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (originalExists && overwrite) {
    await createBackup(originalPath);
    await createBackup(thumbPath);
    await createBackup(previewPath);
  }

  try {
    // Save original JPEG
    await fs.writeFile(originalPath, buffer);
    setImmutable(originalPath);
    console.log(`[HOMEPAGE-SAMPLES] Saved hero original: ${originalPath}`);

    // Generate 400px thumbnail WebP
    const thumbBuffer = await sharp(buffer)
      .resize(400, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    await fs.writeFile(thumbPath, thumbBuffer);
    setImmutable(thumbPath);
    console.log(`[HOMEPAGE-SAMPLES] Generated hero thumb: ${thumbPath}`);

    // Generate 800px preview WebP
    const previewBuffer = await sharp(buffer)
      .resize(800, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    await fs.writeFile(previewPath, previewBuffer);
    setImmutable(previewPath);
    console.log(`[HOMEPAGE-SAMPLES] Generated hero preview: ${previewPath}`);

    // Verify files were created successfully
    const [origStats, thumbStats, previewStats] = await Promise.all([
      fs.stat(originalPath).catch(() => null),
      fs.stat(thumbPath).catch(() => null),
      fs.stat(previewPath).catch(() => null),
    ]);

    if (!previewStats || previewStats.size === 0) {
      console.error('[HOMEPAGE-SAMPLES] Hero WebP preview generation failed or empty:', previewPath);
      return {
        success: false,
        error: 'Hero WebP preview generation failed - file is empty or missing. Please try again.',
      };
    }

    return {
      success: true,
      message: `Hero ${orientation} image uploaded and WebP variants generated successfully`,
      paths: {
        original: `/samples/${language}/homepage/hero-${orientation}.jpeg`,
        thumb: `/samples/${language}/homepage/hero-${orientation}_thumb.webp`,
        preview: `/samples/${language}/homepage/hero-${orientation}_preview.webp`
      },
      sizes: {
        original: origStats?.size || 0,
        thumb: thumbStats?.size || 0,
        preview: previewStats?.size || 0,
      }
    };
  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] Hero image processing error:', error);
    return {
      success: false,
      error: `Failed to process hero image: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File | null;
    const locale = formData.get('locale') as string | null;
    const appId = formData.get('appId') as string | null;
    const fileType = formData.get('fileType') as string | null; // 'thumbnail' or 'pdf'
    const overwriteParam = formData.get('overwrite') as string | null;
    const overwrite = overwriteParam === 'true';

    // Validate required fields
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (!locale || !localeToFolder[locale]) {
      return NextResponse.json({
        success: false,
        error: `Invalid locale. Must be one of: ${Object.keys(localeToFolder).join(', ')}`
      }, { status: 400 });
    }

    if (!fileType || !VALID_FILE_TYPES.includes(fileType)) {
      return NextResponse.json({
        success: false,
        error: `fileType must be one of: ${VALID_FILE_TYPES.join(', ')}`
      }, { status: 400 });
    }

    // appId is required for thumbnail and pdf, not for hero images
    const isHeroImage = fileType === 'hero-portrait' || fileType === 'hero-landscape';
    if (!isHeroImage && (!appId || !validAppIds.includes(appId))) {
      return NextResponse.json({
        success: false,
        error: `Invalid appId. Must be one of: ${validAppIds.join(', ')}`
      }, { status: 400 });
    }

    const language = localeToFolder[locale];
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process based on file type
    if (fileType === 'thumbnail') {
      // Validate image file
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return NextResponse.json({
          success: false,
          error: `Invalid image type. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`
        }, { status: 400 });
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({
          success: false,
          error: `Image too large. Maximum size: ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
        }, { status: 400 });
      }

      const result = await processImageUpload(buffer, language, appId!, overwrite);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });

    } else if (fileType === 'pdf') {
      // Validate PDF file
      if (file.type !== ALLOWED_PDF_TYPE) {
        return NextResponse.json({
          success: false,
          error: 'Invalid file type. Only PDF files are allowed.'
        }, { status: 400 });
      }

      if (file.size > MAX_PDF_SIZE) {
        return NextResponse.json({
          success: false,
          error: `PDF too large. Maximum size: ${MAX_PDF_SIZE / 1024 / 1024}MB`
        }, { status: 400 });
      }

      const result = await processPdfUpload(buffer, language, appId!, overwrite);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });

    } else if (fileType === 'hero-portrait' || fileType === 'hero-landscape') {
      // Validate hero image file
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return NextResponse.json({
          success: false,
          error: `Invalid image type. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`
        }, { status: 400 });
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({
          success: false,
          error: `Image too large. Maximum size: ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
        }, { status: 400 });
      }

      const orientation = fileType === 'hero-portrait' ? 'portrait' : 'landscape';
      const result = await processHeroImageUpload(buffer, language, orientation, overwrite);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });

    } else {
      return NextResponse.json({
        success: false,
        error: `Unsupported fileType: ${fileType}`
      }, { status: 400 });
    }

  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] Upload error:', error);
    return NextResponse.json({
      success: false,
      error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// GET endpoint to retrieve info about the API
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'Homepage Samples Upload API',
    description: 'Upload thumbnails, PDFs, and hero images for homepage samples with automatic WebP generation',
    endpoints: {
      POST: {
        description: 'Upload a file',
        formDataFields: {
          file: 'The file to upload (JPEG/PNG/WebP for images, PDF for pdfs)',
          locale: `Locale code: ${Object.keys(localeToFolder).join(', ')}`,
          appId: `App identifier (required for thumbnail/pdf, not for hero images): ${validAppIds.slice(0, 5).join(', ')}... (33 total)`,
          fileType: `${VALID_FILE_TYPES.join(', ')}`,
          overwrite: 'Set to "true" to overwrite existing files (creates backup)'
        }
      }
    },
    validLocales: Object.keys(localeToFolder),
    validAppIds: validAppIds,
    validFileTypes: VALID_FILE_TYPES,
    limits: {
      maxImageSize: `${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
      maxPdfSize: `${MAX_PDF_SIZE / 1024 / 1024}MB`
    }
  });
}
