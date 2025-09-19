import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './auth';

export async function requireAdmin(request: NextRequest) {
  const user = await getCurrentUser(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  if (!user.isAdmin) {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return user;
}

export function withAdminAuth(
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const adminCheck = await requireAdmin(request);
    
    if (adminCheck instanceof NextResponse) {
      return adminCheck; // Return error response
    }
    
    return handler(request, adminCheck); // Call handler with admin user
  };
}