const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const userId = 'cmggy1i8l0000da8gjytjxk2x'; // Admin user ID

  console.log('🧪 Testing Device Conflict Modal\n');

  // Step 1: Check current sessions
  const currentSessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`📊 Current sessions: ${currentSessions.length}`);
  currentSessions.forEach((s, i) => {
    console.log(`   ${i + 1}. Device: ${s.deviceId || 'null'} - ${s.deviceName}`);
  });

  // Step 2: Create a fake "second device" session
  console.log('\n🔧 Creating fake "second device" session...');

  const fakeSession = await prisma.session.create({
    data: {
      userId: userId,
      token: 'fake-access-token-' + Date.now(),
      refreshToken: 'fake-refresh-token-' + Date.now(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      deviceId: 'test-device-different-12345',
      deviceName: 'iPhone 13 on iOS 17',
      deviceType: 'mobile',
      browser: 'Safari 17.0',
      os: 'iOS 17.2',
      ipAddress: '192.168.1.100',
      country: 'US',
      city: 'New York',
      lastActivityAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    }
  });

  console.log('✅ Created fake session:');
  console.log(`   Device ID: ${fakeSession.deviceId}`);
  console.log(`   Device Name: ${fakeSession.deviceName}`);
  console.log(`   Last Active: ${fakeSession.lastActivityAt.toLocaleString()}`);

  // Step 3: Show all sessions
  const allSessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { lastActivityAt: 'desc' }
  });

  console.log(`\n📊 Total active sessions now: ${allSessions.length}`);
  allSessions.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.deviceName} (${s.deviceId})`);
    console.log(`      Last active: ${s.lastActivityAt.toLocaleString()}`);
  });

  console.log('\n✅ Test setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Sign out from your current browser session');
  console.log('2. Try to sign in again');
  console.log('3. You should see the device conflict modal showing "iPhone 13 on iOS 17"');
  console.log('4. Test the "Sign Out Other Device & Continue" button');
  console.log('5. Check the translations by changing language in the modal');
  console.log('\n🧹 To clean up after testing, run:');
  console.log('   node scripts/cleanup-sessions.js');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
