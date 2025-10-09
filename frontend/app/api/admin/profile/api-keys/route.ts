import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import crypto from 'crypto';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  keyPreview: string;
  permissions: string[];
  rateLimit: number;
  rateLimitWindow: 'second' | 'minute' | 'hour' | 'day';
  expiresAt?: string;
  lastUsed?: string;
  usageCount: number;
  createdAt: string;
  status: 'active' | 'revoked' | 'expired';
  ipWhitelist: string[];
  description?: string;
}

interface ApiKeyUsage {
  keyId: string;
  date: string;
  requests: number;
  errors: number;
  averageResponseTime: number;
  endpoints: Record<string, number>;
}

// Mock API keys storage
const apiKeys = new Map<string, ApiKey[]>([
  ['user_1', [
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'lcs_live_1234567890abcdef',
      keyPreview: 'lcs_live_1234...cdef',
      permissions: ['read:worksheets', 'write:worksheets', 'read:users'],
      rateLimit: 1000,
      rateLimitWindow: 'hour',
      expiresAt: '2025-12-31T23:59:59Z',
      lastUsed: new Date(Date.now() - 3600000).toISOString(),
      usageCount: 15234,
      createdAt: '2024-01-01T00:00:00Z',
      status: 'active',
      ipWhitelist: [],
      description: 'Main production API key for worksheet generation'
    },
    {
      id: 'key_2',
      name: 'Development API Key',
      key: 'lcs_test_abcdef1234567890',
      keyPreview: 'lcs_test_abcd...7890',
      permissions: ['read:worksheets'],
      rateLimit: 100,
      rateLimitWindow: 'hour',
      lastUsed: new Date().toISOString(),
      usageCount: 523,
      createdAt: '2024-06-15T10:00:00Z',
      status: 'active',
      ipWhitelist: ['127.0.0.1', '192.168.1.0/24'],
      description: 'Testing and development purposes only'
    },
    {
      id: 'key_3',
      name: 'Mobile App Key',
      key: 'lcs_mobile_xyz123456789',
      keyPreview: 'lcs_mobile_xyz...789',
      permissions: ['read:worksheets', 'read:users'],
      rateLimit: 500,
      rateLimitWindow: 'hour',
      lastUsed: new Date(Date.now() - 86400000).toISOString(),
      usageCount: 8921,
      createdAt: '2024-03-20T14:30:00Z',
      status: 'revoked',
      ipWhitelist: [],
      description: 'Revoked due to security update'
    }
  ]]
]);

// Mock usage statistics
const apiKeyUsage: ApiKeyUsage[] = [
  {
    keyId: 'key_1',
    date: new Date().toISOString().split('T')[0],
    requests: 234,
    errors: 2,
    averageResponseTime: 145,
    endpoints: {
      '/api/worksheets': 120,
      '/api/users': 80,
      '/api/files': 34
    }
  },
  {
    keyId: 'key_1',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    requests: 312,
    errors: 5,
    averageResponseTime: 132,
    endpoints: {
      '/api/worksheets': 200,
      '/api/users': 100,
      '/api/files': 12
    }
  }
];

class ApiKeyService {
  generateApiKey(prefix: string = 'lcs'): string {
    const randomBytes = crypto.randomBytes(24).toString('hex');
    return `${prefix}_${randomBytes}`;
  }

  maskApiKey(key: string): string {
    if (key.length <= 12) return key;
    const prefix = key.substring(0, 10);
    const suffix = key.substring(key.length - 4);
    return `${prefix}...${suffix}`;
  }

  async createApiKey(
    userId: string,
    options: {
      name: string;
      permissions: string[];
      rateLimit?: number;
      rateLimitWindow?: 'second' | 'minute' | 'hour' | 'day';
      expiresAt?: string;
      ipWhitelist?: string[];
      description?: string;
    }
  ): Promise<ApiKey> {
    const key = this.generateApiKey(options.name.includes('test') ? 'lcs_test' : 'lcs_live');

    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: options.name,
      key,
      keyPreview: this.maskApiKey(key),
      permissions: options.permissions,
      rateLimit: options.rateLimit || 1000,
      rateLimitWindow: options.rateLimitWindow || 'hour',
      expiresAt: options.expiresAt,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      status: 'active',
      ipWhitelist: options.ipWhitelist || [],
      description: options.description
    };

    const userKeys = apiKeys.get(userId) || [];
    userKeys.push(newKey);
    apiKeys.set(userId, userKeys);

    return newKey;
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return apiKeys.get(userId) || [];
  }

  async revokeApiKey(userId: string, keyId: string): Promise<boolean> {
    const userKeys = apiKeys.get(userId);
    if (!userKeys) return false;

    const key = userKeys.find(k => k.id === keyId);
    if (!key) return false;

    key.status = 'revoked';
    apiKeys.set(userId, userKeys);
    return true;
  }

  async rotateApiKey(userId: string, keyId: string): Promise<ApiKey | null> {
    const userKeys = apiKeys.get(userId);
    if (!userKeys) return null;

    const oldKey = userKeys.find(k => k.id === keyId);
    if (!oldKey) return null;

    // Create new key with same settings
    const newKey: ApiKey = {
      ...oldKey,
      id: `key_${Date.now()}`,
      key: this.generateApiKey(oldKey.name.includes('test') ? 'lcs_test' : 'lcs_live'),
      keyPreview: '',
      usageCount: 0,
      createdAt: new Date().toISOString(),
      lastUsed: undefined
    };
    newKey.keyPreview = this.maskApiKey(newKey.key);

    // Mark old key as revoked
    oldKey.status = 'revoked';

    userKeys.push(newKey);
    apiKeys.set(userId, userKeys);

    return newKey;
  }

  async getApiKeyUsage(keyId: string, days: number = 7): Promise<ApiKeyUsage[]> {
    // Generate mock usage data
    const usage: ApiKeyUsage[] = [];
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() - i * 86400000);
      usage.push({
        keyId,
        date: date.toISOString().split('T')[0],
        requests: Math.floor(Math.random() * 500) + 100,
        errors: Math.floor(Math.random() * 10),
        averageResponseTime: Math.floor(Math.random() * 200) + 50,
        endpoints: {
          '/api/worksheets': Math.floor(Math.random() * 200) + 50,
          '/api/users': Math.floor(Math.random() * 100) + 20,
          '/api/files': Math.floor(Math.random() * 50) + 10
        }
      });
    }

    return usage;
  }
}

const apiKeyService = new ApiKeyService();

// GET /api/admin/profile/api-keys
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const includeRevoked = searchParams.get('includeRevoked') === 'true';
    const keyId = searchParams.get('keyId');

    const userId = session.user.id || 'user_1';

    // Get usage for specific key
    if (keyId) {
      const usage = await apiKeyService.getApiKeyUsage(keyId);
      return NextResponse.json({ usage });
    }

    // Get all keys
    let keys = await apiKeyService.getApiKeys(userId);

    if (!includeRevoked) {
      keys = keys.filter(k => k.status === 'active');
    }

    // Don't send full keys in list response
    const sanitizedKeys = keys.map(({ key, ...rest }) => rest);

    return NextResponse.json({
      keys: sanitizedKeys,
      total: sanitizedKeys.length,
      limits: {
        maxKeys: 10,
        currentKeys: sanitizedKeys.filter(k => k.status === 'active').length
      }
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

// POST /api/admin/profile/api-keys
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.permissions || !Array.isArray(data.permissions)) {
      return NextResponse.json(
        { error: 'Name and permissions are required' },
        { status: 400 }
      );
    }

    // Validate permissions
    const validPermissions = [
      'read:worksheets',
      'write:worksheets',
      'delete:worksheets',
      'read:users',
      'write:users',
      'read:files',
      'write:files',
      'delete:files',
      'read:analytics',
      'admin:all'
    ];

    const invalidPermissions = data.permissions.filter(
      (p: string) => !validPermissions.includes(p)
    );

    if (invalidPermissions.length > 0) {
      return NextResponse.json(
        { error: `Invalid permissions: ${invalidPermissions.join(', ')}` },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';

    // Check key limit
    const existingKeys = await apiKeyService.getApiKeys(userId);
    const activeKeys = existingKeys.filter(k => k.status === 'active');

    if (activeKeys.length >= 10) {
      return NextResponse.json(
        { error: 'Maximum number of API keys reached (10)' },
        { status: 400 }
      );
    }

    const newKey = await apiKeyService.createApiKey(userId, {
      name: data.name,
      permissions: data.permissions,
      rateLimit: data.rateLimit,
      rateLimitWindow: data.rateLimitWindow,
      expiresAt: data.expiresAt,
      ipWhitelist: data.ipWhitelist,
      description: data.description
    });

    return NextResponse.json({
      success: true,
      apiKey: newKey,
      message: 'API key created successfully. Store it securely as it won\'t be shown again.'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/profile/api-keys/[id]
export async function PUT(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, keyId } = await request.json();

    if (!keyId) {
      return NextResponse.json(
        { error: 'Key ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';

    if (action === 'revoke') {
      const success = await apiKeyService.revokeApiKey(userId, keyId);
      if (!success) {
        return NextResponse.json(
          { error: 'API key not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'API key revoked successfully'
      });
    }

    if (action === 'rotate') {
      const newKey = await apiKeyService.rotateApiKey(userId, keyId);
      if (!newKey) {
        return NextResponse.json(
          { error: 'API key not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        apiKey: newKey,
        message: 'API key rotated successfully. Store the new key securely.'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/profile/api-keys/[id]
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const keyId = searchParams.get('keyId');

    if (!keyId) {
      return NextResponse.json(
        { error: 'Key ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const userKeys = apiKeys.get(userId);

    if (!userKeys) {
      return NextResponse.json(
        { error: 'No API keys found' },
        { status: 404 }
      );
    }

    const keyIndex = userKeys.findIndex(k => k.id === keyId);
    if (keyIndex === -1) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    userKeys.splice(keyIndex, 1);
    apiKeys.set(userId, userKeys);

    return NextResponse.json({
      success: true,
      message: 'API key deleted permanently'
    });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}