const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkColumns() {
  try {
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;

    console.log('=== USERS TABLE COLUMNS ===');
    columns.forEach(col => {
      console.log(`${col.column_name}: ${col.data_type}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkColumns();
