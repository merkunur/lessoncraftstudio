import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name);
    const uniqueName = `${type}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    
    // Create uploads directory structure
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', type);
    await mkdir(uploadsDir, { recursive: true });
    
    // Save file
    const filePath = path.join(uploadsDir, uniqueName);
    await writeFile(filePath, buffer);
    
    // Return public URL
    const publicUrl = `/uploads/${type}/${uniqueName}`;
    
    return NextResponse.json({ 
      success: true,
      url: publicUrl,
      filename: uniqueName
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return NextResponse.json(
        { error: 'No file URL provided' },
        { status: 400 }
      );
    }

    // Security: Only allow deleting files in uploads directory
    if (!fileUrl.startsWith('/uploads/')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', fileUrl);
    const { unlink } = await import('fs/promises');
    
    try {
      await unlink(filePath);
      return NextResponse.json({ success: true });
    } catch (err) {
      // File might not exist
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}