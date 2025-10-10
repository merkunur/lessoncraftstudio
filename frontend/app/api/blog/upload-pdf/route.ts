import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    const files = formData.getAll('pdfs') as File[];
    const thumbnails = formData.getAll('thumbnails') as File[];

    if (!slug || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing slug or PDF files' },
        { status: 400 }
      );
    }

    // Create the shared PDFs directory if it doesn't exist
    const pdfDir = path.join(process.cwd(), 'public', 'blog', 'pdfs', slug);
    await fs.mkdir(pdfDir, { recursive: true });

    const uploadedPDFs = [];

    // Create thumbnails directory
    const thumbDir = path.join(process.cwd(), 'public', 'blog', 'thumbnails', slug);
    await fs.mkdir(thumbDir, { recursive: true });

    // Process each uploaded file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const thumbnail = thumbnails[i];

      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save the PDF file
      const filePath = path.join(pdfDir, file.name);
      await fs.writeFile(filePath, buffer);

      // Save thumbnail if provided
      let thumbnailPath = '/blog/thumbnails/default-pdf.svg';
      if (thumbnail && thumbnail.size > 0) {
        const thumbBytes = await thumbnail.arrayBuffer();
        const thumbBuffer = Buffer.from(thumbBytes);
        // Use original extension from thumbnail file
        const thumbExt = thumbnail.name.split('.').pop() || 'png';
        const thumbName = file.name.replace('.pdf', `.${thumbExt}`);
        const thumbFilePath = path.join(thumbDir, thumbName);
        await fs.writeFile(thumbFilePath, thumbBuffer);
        thumbnailPath = `/blog/thumbnails/${slug}/${thumbName}`;
        console.log('Saved thumbnail:', thumbnailPath);
      }

      uploadedPDFs.push({
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        path: `/blog/pdfs/${slug}/${file.name}`,
        thumbnail: thumbnailPath,
        title: file.name.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' ')
      });
    }

    // Return the list of all PDFs in the directory
    const allFiles = await fs.readdir(pdfDir);
    const allPDFs = await Promise.all(
      allFiles.filter(file => file.endsWith('.pdf')).map(async (fileName) => {
        const filePath = path.join(pdfDir, fileName);
        const stats = await fs.stat(filePath);

        // Check for thumbnail - try multiple extensions
        let thumbnail = '/blog/thumbnails/default-pdf.svg';
        const baseThumbName = fileName.replace('.pdf', '');
        const thumbExtensions = ['.png', '.jpg', '.jpeg', '.svg'];

        for (const ext of thumbExtensions) {
          const thumbPath = path.join(thumbDir, baseThumbName + ext);
          try {
            await fs.access(thumbPath);
            thumbnail = `/blog/thumbnails/${slug}/${baseThumbName}${ext}`;
            break;
          } catch {
            // Try next extension
          }
        }

        return {
          fileName,
          fileSize: `${(stats.size / 1024).toFixed(1)} KB`,
          path: `/blog/pdfs/${slug}/${fileName}`,
          thumbnail,
          title: fileName.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' ')
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: `${files.length} PDF(s) uploaded successfully`,
      pdfs: allPDFs
    });

  } catch (error) {
    console.error('Error uploading PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to upload PDFs' },
      { status: 500 }
    );
  }
}