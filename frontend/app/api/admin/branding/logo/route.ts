import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, copyFile, access } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('logo') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image file.' },
        { status: 400 }
      );
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 2MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = path.extname(file.name) || '.png';
    const fileName = `logo-${Date.now()}${fileExtension}`;

    // Define upload paths - adjust for where Next.js is running
    const publicDir = path.join(process.cwd(), 'public');
    const uploadDir = path.join(publicDir, 'uploads', 'branding');
    const filePath = path.join(uploadDir, fileName);

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Save the uploaded file
    await writeFile(filePath, buffer);

    // Define the main logo path
    const currentLogoPath = path.join(publicDir, 'logo-lcs.png');

    // Backup current logo if it exists
    try {
      await access(currentLogoPath);
      const backupPath = path.join(uploadDir, `logo-backup-${Date.now()}.png`);
      await copyFile(currentLogoPath, backupPath);
      console.log('Current logo backed up to:', backupPath);
    } catch (error) {
      console.log('No existing logo to backup or error backing up:', error);
    }

    // Replace the main logo with the new one
    await writeFile(currentLogoPath, buffer);
    console.log('Logo updated at:', currentLogoPath);

    // Return success response with cache-busting parameter
    return NextResponse.json({
      success: true,
      logoUrl: `/logo-lcs.png?v=${Date.now()}`,
      uploadedFile: `/uploads/branding/${fileName}`,
      message: 'Logo updated successfully'
    });

  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: `Failed to upload logo: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return current logo information
    const logoPath = '/logo-lcs.png';

    return NextResponse.json({
      currentLogo: logoPath,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get logo error:', error);
    return NextResponse.json(
      { error: 'Failed to get logo information' },
      { status: 500 }
    );
  }
}