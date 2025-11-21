import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { seedBlogPosts } from './seeds/blog-posts';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password for all test users
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'admin@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'full',
      isAdmin: true,
      language: 'en',
      timezone: 'America/New_York',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create Full Tier User
  const fullUser = await prisma.user.upsert({
    where: { email: 'full@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'full@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Full',
      lastName: 'Subscriber',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'full',
      isAdmin: false,
      language: 'en',
      timezone: 'America/Los_Angeles',
    },
  });
  console.log('✅ Created full tier user:', fullUser.email);

  // Create Core Tier User
  const coreUser = await prisma.user.upsert({
    where: { email: 'core@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'core@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Core',
      lastName: 'Subscriber',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'core',
      isAdmin: false,
      language: 'en',
      timezone: 'America/Chicago',
    },
  });
  console.log('✅ Created core tier user:', coreUser.email);

  // Create Free Tier User
  const freeUser = await prisma.user.upsert({
    where: { email: 'free@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'free@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Free',
      lastName: 'User',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'free',
      isAdmin: false,
      language: 'en',
      timezone: 'UTC',
    },
  });
  console.log('✅ Created free tier user:', freeUser.email);

  // Create Default Roles
  console.log('\n👥 Creating default roles...');

  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      slug: 'admin',
      description: 'Full system access with all permissions',
      isSystem: true,
      permissions: [
        'users:read', 'users:write', 'users:delete', 'users:impersonate',
        'roles:read', 'roles:write', 'roles:delete', 'roles:assign',
        'content:read', 'content:write', 'content:delete', 'content:publish',
        'subscriptions:read', 'subscriptions:write', 'subscriptions:cancel', 'subscriptions:refund',
        'support:read', 'support:write', 'support:close',
        'settings:read', 'settings:write',
        'analytics:read', 'analytics:export',
      ],
    },
  });
  console.log('✅ Created role:', adminRole.name);

  const editorRole = await prisma.role.upsert({
    where: { slug: 'editor' },
    update: {},
    create: {
      name: 'Editor',
      slug: 'editor',
      description: 'Can manage content and view analytics',
      isSystem: true,
      permissions: [
        'users:read',
        'content:read', 'content:write', 'content:publish',
        'analytics:read',
      ],
    },
  });
  console.log('✅ Created role:', editorRole.name);

  const supportRole = await prisma.role.upsert({
    where: { slug: 'support' },
    update: {},
    create: {
      name: 'Support',
      slug: 'support',
      description: 'Can handle support tickets and view user info',
      isSystem: true,
      permissions: [
        'users:read',
        'subscriptions:read',
        'support:read', 'support:write', 'support:close',
      ],
    },
  });
  console.log('✅ Created role:', supportRole.name);

  const viewerRole = await prisma.role.upsert({
    where: { slug: 'viewer' },
    update: {},
    create: {
      name: 'Viewer',
      slug: 'viewer',
      description: 'Read-only access to analytics and reports',
      isSystem: true,
      permissions: [
        'analytics:read',
        'content:read',
        'users:read',
      ],
    },
  });
  console.log('✅ Created role:', viewerRole.name);

  // Assign Admin role to admin user
  const existingAdminRole = await prisma.userRole.findUnique({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    },
  });

  if (!existingAdminRole) {
    await prisma.userRole.create({
      data: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    });
    console.log('✅ Assigned Admin role to admin user');
  }

  // Create Default Security Settings
  console.log('\n🔒 Creating default security settings...');
  const securitySettings = await prisma.securitySetting.upsert({
    where: { id: 'security' },
    update: {},
    create: {
      id: 'security',
      // Password Policy
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireLowercase: true,
      passwordRequireNumbers: true,
      passwordRequireSpecial: false,
      // Session Management
      maxSessionsPerUser: 5,
      sessionTimeoutMinutes: 10080, // 7 days
      sessionIdleMinutes: 60, // 1 hour
      // Login Security
      maxLoginAttempts: 5,
      lockoutDurationMinutes: 15,
      require2FA: false,
      require2FAForAdmins: false,
      enableEmailVerification: true,
      // Account Sharing Detection
      enableAccountSharingDetection: false,
      maxConcurrentDevices: 3,
      suspiciousActivityThreshold: 5,
      // IP Security
      enableIpWhitelist: false,
      ipWhitelist: [],
      enableIpBlacklist: false,
      ipBlacklist: [],
      // Security Features
      enableCsrfProtection: true,
      enableRateLimiting: true,
      rateLimitRequestsPerMin: 100,
      // Audit Logging
      logAllAuthEvents: true,
      logFailedLogins: true,
      logPasswordChanges: true,
      logRoleChanges: true,
      retainAuditLogDays: 90,
      updatedBy: 'system',
    },
  });
  console.log('✅ Created default security settings');

  // Seed blog posts
  await seedBlogPosts();

  console.log('\n🎉 Seeding completed!');
  console.log('\n📝 Test Users Created:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: admin@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: full | Admin: ✅');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: full@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: full | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: core@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: core | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: free@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: free | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
