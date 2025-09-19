import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string; fileName: string } }
) {
  try {
    const { slug, fileName } = params;

    // Get the PDF file path
    const filePath = path.join(process.cwd(), 'public', 'blog', 'pdfs', slug, fileName);

    // Delete the file
    await fs.unlink(filePath);

    // Get the updated list of PDFs
    const pdfDir = path.join(process.cwd(), 'public', 'blog', 'pdfs', slug);
    const files = await fs.readdir(pdfDir);
    const pdfs = await Promise.all(
      files.filter(file => file.endsWith('.pdf')).map(async (fileName) => {
        const filePath = path.join(pdfDir, fileName);
        const stats = await fs.stat(filePath);
        return {
          fileName,
          fileSize: `${(stats.size / 1024).toFixed(1)} KB`,
          path: `/blog/pdfs/${slug}/${fileName}`
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: 'PDF deleted successfully',
      pdfs
    });

  } catch (error) {
    console.error('Error deleting PDF:', error);
    return NextResponse.json(
      { error: 'Failed to delete PDF' },
      { status: 500 }
    );
  }
}