import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get the PDFs directory for this blog post
    const pdfDir = path.join(process.cwd(), 'public', 'blog', 'pdfs', slug);

    console.log('Looking for PDFs in:', pdfDir);

    // Check if directory exists
    try {
      await fs.access(pdfDir);
    } catch {
      // Directory doesn't exist yet
      return NextResponse.json({ pdfs: [] });
    }

    // Check for thumbnails directory
    const thumbDir = path.join(process.cwd(), 'public', 'blog', 'thumbnails', slug);

    // Read all PDF files in the directory
    const files = await fs.readdir(pdfDir);
    const pdfs = await Promise.all(
      files.filter(file => file.endsWith('.pdf')).map(async (fileName) => {
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
            console.log(`Found thumbnail: ${thumbnail}`);
            break;
          } catch {
            // Try next extension
          }
        }

        const result = {
          fileName,
          fileSize: `${(stats.size / 1024).toFixed(1)} KB`,
          path: `/blog/pdfs/${slug}/${fileName}`,
          thumbnail,
          title: fileName.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' ')
            .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        };
        console.log('Found PDF:', result);
        return result;
      })
    );

    return NextResponse.json({ pdfs });

  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDFs' },
      { status: 500 }
    );
  }
}