// Script to fix misplaced images in /images/library/
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Use production database
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://lcs_user:LcS2025SecureDBPass@localhost:5432/lessoncraftstudio_prod'
    }
  }
});

async function fixImagePaths() {
  console.log('🔧 Fixing misplaced image paths...\n');

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const libraryDir = path.join(imagesDir, 'library');

  if (!fs.existsSync(libraryDir)) {
    console.log('✅ No /library/ directory found - nothing to fix');
    await prisma.$disconnect();
    return;
  }

  // Get all subdirectories in library
  const themes = fs.readdirSync(libraryDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`Found ${themes.length} themes in /library/: ${themes.join(', ')}\n`);

  let movedCount = 0;
  let updatedDbCount = 0;

  for (const themeName of themes) {
    const sourceDir = path.join(libraryDir, themeName);
    const targetDir = path.join(imagesDir, themeName);

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Get all images in source directory
    const files = fs.readdirSync(sourceDir)
      .filter(f => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f));

    console.log(`📁 Processing theme: ${themeName} (${files.length} images)`);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      // Move file
      if (!fs.existsSync(targetPath)) {
        fs.renameSync(sourcePath, targetPath);
        console.log(`  ✅ Moved: ${file}`);
        movedCount++;
      } else {
        console.log(`  ⚠️  Target exists, skipping: ${file}`);
      }

      // Update database path
      const oldPath = `/images/library/${themeName}/${file}`;
      const newPath = `/images/${themeName}/${file}`;

      const result = await prisma.imageLibraryItem.updateMany({
        where: { filePath: oldPath },
        data: { filePath: newPath }
      });

      if (result.count > 0) {
        console.log(`  📝 Updated DB path: ${oldPath} → ${newPath}`);
        updatedDbCount += result.count;
      }
    }

    // Remove empty source directory
    if (fs.readdirSync(sourceDir).length === 0) {
      fs.rmdirSync(sourceDir);
      console.log(`  🗑️  Removed empty directory: ${sourceDir}\n`);
    }
  }

  // Remove library directory if empty
  if (fs.existsSync(libraryDir) && fs.readdirSync(libraryDir).length === 0) {
    fs.rmdirSync(libraryDir);
    console.log('🗑️  Removed empty /library/ directory\n');
  }

  console.log(`\n✅ Migration complete:`);
  console.log(`   - Files moved: ${movedCount}`);
  console.log(`   - Database records updated: ${updatedDbCount}`);

  await prisma.$disconnect();
}

fixImagePaths().catch(console.error);
