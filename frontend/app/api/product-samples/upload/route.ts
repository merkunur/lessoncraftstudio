import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

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

// Valid app IDs (33 apps) - mapped to their server folder names
const appIdToFolder: Record<string, string> = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'multiplication': 'multiplication',
  'division': 'division',
  'math-worksheet': 'math',
  'pattern-worksheet': 'pattern',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word-scramble',
  'word-guess': 'word-guess',
  'alphabet-train': 'alphabet-train',
  'alphabet-tracing': 'alphabet-tracing',
  'tracing-worksheet': 'tracing',
  'prepositions': 'prepositions',
  'bingo': 'bingo',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'odd-one-out': 'odd-one-out',
  'picture-path': 'picture-path',
  'pattern-train': 'pattern-train',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'picture-sort': 'picture-sort',
  'shadow-match': 'shadow-match',
};

// Base path for samples - production uses /opt/lessoncraftstudio/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/opt/lessoncraftstudio/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Valid file types for upload
const VALID_FILE_TYPES = ['worksheet', 'answer', 'pdf'];

// Valid slot numbers
const VALID_SLOTS = [1, 2, 3, 4, 5];

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
    console.log(`[PRODUCT-SAMPLES] Created directory: ${dir}`);
  }
}

async function createBackup(filePath: string): Promise<string | null> {
  try {
    await fs.access(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.bak.${timestamp}`;
    await fs.copyFile(filePath, backupPath);
    console.log(`[PRODUCT-SAMPLES] Created backup: ${backupPath}`);
    return backupPath;
  } catch {
    // File doesn't exist, no backup needed
    return null;
  }
}

async function processWorksheetUpload(
  buffer: Buffer,
  language: string,
  folderName: string,
  slot: number,
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, folderName);
  await ensureDirectoryExists(dir);

  const originalPath = path.join(dir, `sample-${slot}.jpeg`);
  const thumbPath = path.join(dir, `sample-${slot}_thumb.webp`);
  const previewPath = path.join(dir, `sample-${slot}_preview.webp`);

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
      error: `File already exists: sample-${slot}.jpeg. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (originalExists && overwrite) {
    await createBackup(originalPath);
    await createBackup(thumbPath);
    await createBackup(previewPath);
  }

  try {
    // Convert to JPEG and save original
    const jpegBuffer = await sharp(buffer)
      .jpeg({ quality: 90 })
      .toBuffer();
    await fs.writeFile(originalPath, jpegBuffer);
    console.log(`[PRODUCT-SAMPLES] Saved original: ${originalPath}`);

    // Generate 400px thumbnail WebP
    const thumbBuffer = await sharp(buffer)
      .resize(400, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    await fs.writeFile(thumbPath, thumbBuffer);
    console.log(`[PRODUCT-SAMPLES] Generated thumb: ${thumbPath}`);

    // Generate 800px preview WebP
    const previewBuffer = await sharp(buffer)
      .resize(800, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    await fs.writeFile(previewPath, previewBuffer);
    console.log(`[PRODUCT-SAMPLES] Generated preview: ${previewPath}`);

    return {
      success: true,
      message: 'Worksheet uploaded and WebP variants generated successfully',
      paths: {
        original: `/samples/${language}/${folderName}/sample-${slot}.jpeg`,
        thumb: `/samples/${language}/${folderName}/sample-${slot}_thumb.webp`,
        preview: `/samples/${language}/${folderName}/sample-${slot}_preview.webp`
      }
    };
  } catch (error) {
    console.error('[PRODUCT-SAMPLES] Worksheet processing error:', error);
    return {
      success: false,
      error: `Failed to process worksheet: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function processAnswerUpload(
  buffer: Buffer,
  language: string,
  folderName: string,
  slot: number,
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, folderName);
  await ensureDirectoryExists(dir);

  const originalPath = path.join(dir, `sample-${slot}-answer.jpeg`);
  const thumbPath = path.join(dir, `sample-${slot}-answer_thumb.webp`);
  const previewPath = path.join(dir, `sample-${slot}-answer_preview.webp`);

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
      error: `File already exists: sample-${slot}-answer.jpeg. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (originalExists && overwrite) {
    await createBackup(originalPath);
    await createBackup(thumbPath);
    await createBackup(previewPath);
  }

  try {
    // Convert to JPEG and save original
    const jpegBuffer = await sharp(buffer)
      .jpeg({ quality: 90 })
      .toBuffer();
    await fs.writeFile(originalPath, jpegBuffer);
    console.log(`[PRODUCT-SAMPLES] Saved answer original: ${originalPath}`);

    // Generate 400px thumbnail WebP
    const thumbBuffer = await sharp(buffer)
      .resize(400, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    await fs.writeFile(thumbPath, thumbBuffer);
    console.log(`[PRODUCT-SAMPLES] Generated answer thumb: ${thumbPath}`);

    // Generate 800px preview WebP
    const previewBuffer = await sharp(buffer)
      .resize(800, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    await fs.writeFile(previewPath, previewBuffer);
    console.log(`[PRODUCT-SAMPLES] Generated answer preview: ${previewPath}`);

    return {
      success: true,
      message: 'Answer key uploaded and WebP variants generated successfully',
      paths: {
        original: `/samples/${language}/${folderName}/sample-${slot}-answer.jpeg`,
        thumb: `/samples/${language}/${folderName}/sample-${slot}-answer_thumb.webp`,
        preview: `/samples/${language}/${folderName}/sample-${slot}-answer_preview.webp`
      }
    };
  } catch (error) {
    console.error('[PRODUCT-SAMPLES] Answer processing error:', error);
    return {
      success: false,
      error: `Failed to process answer key: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function processPdfUpload(
  buffer: Buffer,
  language: string,
  folderName: string,
  slot: number,
  overwrite: boolean
): Promise<UploadResult> {
  const dir = path.join(SAMPLES_BASE, language, folderName);
  await ensureDirectoryExists(dir);

  const pdfPath = path.join(dir, `sample-${slot}.pdf`);

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
      error: `File already exists: sample-${slot}.pdf. Set overwrite=true to replace.`
    };
  }

  // Create backup if overwriting
  if (pdfExists && overwrite) {
    await createBackup(pdfPath);
  }

  try {
    await fs.writeFile(pdfPath, buffer);
    console.log(`[PRODUCT-SAMPLES] Saved PDF: ${pdfPath}`);

    return {
      success: true,
      message: 'PDF uploaded successfully',
      paths: {
        pdf: `/samples/${language}/${folderName}/sample-${slot}.pdf`
      }
    };
  } catch (error) {
    console.error('[PRODUCT-SAMPLES] PDF save error:', error);
    return {
      success: false,
      error: `Failed to save PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File | null;
    const locale = formData.get('locale') as string | null;
    const appId = formData.get('appId') as string | null;
    const slotStr = formData.get('slot') as string | null;
    const fileType = formData.get('fileType') as string | null; // 'worksheet', 'answer', or 'pdf'
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

    if (!appId || !appIdToFolder[appId]) {
      return NextResponse.json({
        success: false,
        error: `Invalid appId. Must be one of: ${Object.keys(appIdToFolder).join(', ')}`
      }, { status: 400 });
    }

    const slot = slotStr ? parseInt(slotStr, 10) : NaN;
    if (isNaN(slot) || !VALID_SLOTS.includes(slot)) {
      return NextResponse.json({
        success: false,
        error: `Invalid slot. Must be one of: ${VALID_SLOTS.join(', ')}`
      }, { status: 400 });
    }

    if (!fileType || !VALID_FILE_TYPES.includes(fileType)) {
      return NextResponse.json({
        success: false,
        error: `fileType must be one of: ${VALID_FILE_TYPES.join(', ')}`
      }, { status: 400 });
    }

    const language = localeToFolder[locale];
    const folderName = appIdToFolder[appId];
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process based on file type
    if (fileType === 'worksheet' || fileType === 'answer') {
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

      const result = fileType === 'worksheet'
        ? await processWorksheetUpload(buffer, language, folderName, slot, overwrite)
        : await processAnswerUpload(buffer, language, folderName, slot, overwrite);

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

      const result = await processPdfUpload(buffer, language, folderName, slot, overwrite);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });

    } else {
      return NextResponse.json({
        success: false,
        error: `Unsupported fileType: ${fileType}`
      }, { status: 400 });
    }

  } catch (error) {
    console.error('[PRODUCT-SAMPLES] Upload error:', error);
    return NextResponse.json({
      success: false,
      error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// GET endpoint to retrieve info about the API
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'Product Page Samples Upload API',
    description: 'Upload worksheet images, answer keys, and PDFs for product page samples with automatic WebP generation',
    endpoints: {
      POST: {
        description: 'Upload a file',
        formDataFields: {
          file: 'The file to upload (JPEG/PNG/WebP for images, PDF for pdfs)',
          locale: `Locale code: ${Object.keys(localeToFolder).join(', ')}`,
          appId: `App identifier: ${Object.keys(appIdToFolder).slice(0, 5).join(', ')}... (${Object.keys(appIdToFolder).length} total)`,
          slot: `Slot number: ${VALID_SLOTS.join(', ')}`,
          fileType: `${VALID_FILE_TYPES.join(', ')}`,
          overwrite: 'Set to "true" to overwrite existing files (creates backup)'
        }
      }
    },
    validLocales: Object.keys(localeToFolder),
    validAppIds: Object.keys(appIdToFolder),
    validSlots: VALID_SLOTS,
    validFileTypes: VALID_FILE_TYPES,
    limits: {
      maxImageSize: `${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
      maxPdfSize: `${MAX_PDF_SIZE / 1024 / 1024}MB`
    }
  });
}
