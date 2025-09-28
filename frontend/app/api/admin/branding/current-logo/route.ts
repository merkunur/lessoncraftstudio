import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'logo');

    // Check if directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      // No uploads directory, use default logo
      return NextResponse.json({
        logoUrl: '/logo-lcs.png',
        isDefault: true
      });
    }

    // Get all logo files
    const files = await fs.readdir(uploadDir);
    const logoFiles = files.filter(file =>
      file.startsWith('logo-') &&
      (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg'))
    );

    if (logoFiles.length === 0) {
      return NextResponse.json({
        logoUrl: '/logo-lcs.png',
        isDefault: true
      });
    }

    // Get the most recent logo file based on file modification time
    let mostRecentFile = logoFiles[0];
    let mostRecentTime = (await fs.stat(path.join(uploadDir, logoFiles[0]))).mtime.getTime();

    for (const file of logoFiles) {
      const stats = await fs.stat(path.join(uploadDir, file));
      if (stats.mtime.getTime() > mostRecentTime) {
        mostRecentTime = stats.mtime.getTime();
        mostRecentFile = file;
      }
    }

    return NextResponse.json({
      logoUrl: `/uploads/logo/${mostRecentFile}`,
      isDefault: false
    });

  } catch (error) {
    console.error('Error fetching current logo:', error);
    return NextResponse.json({
      logoUrl: '/logo-lcs.png',
      isDefault: true
    });
  }
}