# Step 4: Auth System Backend - Testing Guide

## ✅ Completed Implementation

### Authentication Endpoints Created:

1. **POST /api/auth/signup**
   - User registration with validation
   - Password hashing with bcrypt
   - Email verification token generation
   - Automatic subscription creation
   - Activity logging

2. **POST /api/auth/signin**
   - User authentication with email/password
   - Account suspension checks
   - Email verification checks
   - Session management
   - Remember me functionality
   - Activity logging for failed/successful attempts

3. **POST /api/auth/signout**
   - Session termination
   - Cookie cleanup
   - Activity logging

4. **POST /api/auth/refresh**
   - Token renewal using refresh token
   - Session extension
   - Automatic token rotation

5. **POST /api/auth/forgot-password**
   - Password reset token generation
   - Rate limiting (5 minutes between requests)
   - Email enumeration prevention
   - Reset email sending

6. **POST /api/auth/reset-password**
   - Password reset with token validation
   - Token expiration checks
   - Password strength validation
   - Session invalidation after reset

7. **POST /api/auth/verify-email**
   - Email verification with token
   - Token expiration (24 hours)
   - Automatic login after verification
   - Welcome email sending

8. **GET /api/auth/verify-email**
   - Resend verification email
   - Rate limiting (5 minutes between resends)

9. **GET /api/auth/me**
   - Get current authenticated user
   - Include subscription details
   - Usage statistics
   - Recent activity

10. **PATCH /api/auth/me**
    - Update user profile
    - Limited to safe fields (name, language, etc.)
    - Activity logging

### Supporting Modules:

1. **auth-utils.ts**
   - JWT token generation and verification
   - Password strength validation
   - Secure token generation
   - Token hashing utilities

2. **email.ts**
   - Email sending infrastructure
   - Multi-language email templates
   - Verification emails
   - Password reset emails
   - Welcome emails
   - Subscription upgrade emails

3. **auth-middleware.ts**
   - Authentication middleware
   - Admin authorization
   - Subscription tier checking
   - User ID extraction

## 🧪 Testing Instructions

### Prerequisites:
```bash
# Ensure Docker containers are running
docker ps

# Install dependencies if not already done
cd frontend
npm install bcryptjs jsonwebtoken nodemailer @react-email/render
npm install -D @types/bcryptjs @types/jsonwebtoken @types/nodemailer
```

### Test 1: User Registration
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "plan": "free",
    "newsletter": true,
    "language": "en"
  }'
```

Expected Response:
```json
{
  "success": true,
  "message": "Account created successfully. Please check your email to verify your account.",
  "user": {...},
  "accessToken": "...",
  "refreshToken": "..."
}
```

### Test 2: User Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "rememberMe": true
  }'
```

### Test 3: Get Current User
```bash
# Use the accessToken from signup/signin response
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Test 4: Request Password Reset
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "language": "en"
  }'
```

### Test 5: Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Test 6: Sign Out
```bash
curl -X POST http://localhost:3000/api/auth/signout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📊 Database Verification

### Check Created Records:
```sql
-- Connect to database
docker exec -it lcs-postgres psql -U postgres -d lessoncraftstudio

-- Check users
SELECT id, email, "emailVerified", "subscriptionTier" FROM "User";

-- Check sessions
SELECT id, "userId", "expiresAt" FROM "Session";

-- Check activity logs
SELECT action, details, "createdAt" FROM "ActivityLog" ORDER BY "createdAt" DESC LIMIT 10;

-- Check subscriptions
SELECT "userId", "planName", status FROM "Subscription";
```

## ✅ Success Criteria

- [x] All authentication endpoints implemented
- [x] JWT token generation and verification
- [x] Password hashing with bcrypt
- [x] Email verification system
- [x] Password reset functionality
- [x] Session management
- [x] Activity logging
- [x] Rate limiting for sensitive operations
- [x] Email templates for all scenarios
- [x] Middleware for route protection
- [x] Subscription tier checking

## 🔒 Security Features Implemented

1. **Password Security**
   - Bcrypt hashing with salt rounds 12
   - Strength validation (8+ chars, uppercase, lowercase, numbers)
   - No password in responses

2. **Token Security**
   - JWT with expiration
   - Refresh token rotation
   - httpOnly cookies for refresh tokens
   - Token hashing for storage

3. **Rate Limiting**
   - 5-minute cooldown for password resets
   - 5-minute cooldown for email verification resends

4. **Email Enumeration Prevention**
   - Generic responses for non-existent emails
   - Same response time for all requests

5. **Session Security**
   - IP address tracking
   - User agent tracking
   - Session expiration
   - Automatic cleanup of old sessions

## 📝 Environment Variables Required

Ensure these are set in your `.env.local`:
```env
# JWT Secrets
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@lessoncraftstudio.com
SMTP_FROM_NAME=LessonCraftStudio

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Session Configuration
SESSION_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d
```

## 🚀 Next Steps (Step 5: Auth System Frontend)

1. Create authentication forms:
   - Sign up form with validation
   - Sign in form with remember me
   - Forgot password form
   - Reset password form
   - Email verification page

2. Create authentication context/hooks:
   - useAuth hook
   - AuthProvider context
   - Protected route wrapper

3. Create user dashboard:
   - Profile management
   - Session management
   - Activity history

## ✅ Step 4 Complete!

The authentication backend is fully implemented with:
- 10 API endpoints
- Complete email system
- Security best practices
- Middleware for protection
- Comprehensive error handling
- Activity logging
- Rate limiting

All endpoints are ready for frontend integration in Step 5.