import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    // Create samples directory for this blog post
    const samplesDir = path.join(process.cwd(), 'public', 'blog', 'samples', slug);
    await fs.mkdir(samplesDir, { recursive: true });

    const uploadedFiles: string[] = [];

    // Process each worksheet file
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('worksheet_') && value instanceof File) {
        const file = value as File;

        // Validate file type
        if (file.type !== 'application/pdf') {
          console.warn(`Skipping non-PDF file: ${file.name}`);
          continue;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          console.warn(`Skipping large file: ${file.name} (${file.size} bytes)`);
          continue;
        }

        // Read file content
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file to disk
        const fileName = file.name.replace(/[^a-z0-9.-]/gi, '_'); // Sanitize filename
        const filePath = path.join(samplesDir, fileName);
        await fs.writeFile(filePath, buffer);

        uploadedFiles.push(fileName);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Uploaded ${uploadedFiles.length} sample worksheets`,
      files: uploadedFiles,
      path: `/blog/samples/${slug}/`
    });

  } catch (error) {
    console.error('Error uploading sample worksheets:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload sample worksheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}