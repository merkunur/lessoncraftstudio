# Blog Manager Troubleshooting Guide

## Quick Diagnosis Steps

### Step 1: Open the Diagnostic Page

Open this page in your browser:
```
http://localhost:3001/worksheet-generators/OPEN-THIS.html
```

### Step 2: Check the Authentication Status

The page will show one of these messages:

#### ✅ "Token is VALID - Admin API accessible!"
**Action:** You're good to go! Click "Open Blog Manager" button.

#### ❌ "Token exists but is INVALID or EXPIRED"
**Problem:** Your login session has expired.
**Solution:** Click the "Click here to log in again" link and sign in with your admin credentials.

#### ❌ "You are NOT logged in"
**Problem:** No authentication token found.
**Solution:** Go to http://localhost:3001/en/auth/signin and log in.

---

## Common Issues and Solutions

### Issue 1: Blank Page

**Symptoms:** Blog manager page loads but shows completely blank page.

**Cause:** Usually caused by expired authentication token.

**Solution:**
1. Open http://localhost:3001/worksheet-generators/OPEN-THIS.html
2. Check if token is valid
3. If expired, click the sign-in link and log in again
4. Return to blog manager

### Issue 2: "Authentication Required" Errors

**Symptoms:** Error messages about authentication or 401 errors.

**Cause:** No valid authentication token.

**Solution:**
1. Go to http://localhost:3001/en/auth/signin
2. Log in with admin credentials
3. Return to blog manager

### Issue 3: Posts Not Loading

**Symptoms:** Blog manager opens but shows "No posts found" or empty list.

**Possible Causes:**
- No posts in database
- Database connection issue
- API endpoint error

**Solution:**
1. Open http://localhost:3001/worksheet-generators/blog-test.html
2. Check the diagnostic output
3. If API call fails, check server console for errors

---

## File Locations

- **Blog Manager:** `http://localhost:3001/worksheet-generators/blog-content-manager.html`
- **Diagnostic Page:** `http://localhost:3001/worksheet-generators/OPEN-THIS.html`
- **Test Page:** `http://localhost:3001/worksheet-generators/blog-test.html`
- **Sign In:** `http://localhost:3001/en/auth/signin`

---

## Recent Changes (Summary)

### Synchronization Fixes
1. **Featured Image Upload** - Now syncs `currentPost.featuredImage` immediately after upload
2. **Save Post** - Now reloads both post list and current post from database
3. **API Endpoints** - Changed from public API to admin API for loading posts

### Authentication Improvements
1. Better error messages when token is missing or invalid
2. Page loads even without token (shows error messages instead of blank page)
3. Diagnostic pages to help troubleshoot authentication issues

---

## Server Status Check

1. Ensure dev server is running on port 3001
2. Check for this in terminal: `- Local: http://localhost:3001`
3. Look for any error messages in the server console

---

## Database Check

To verify posts exist in database:
```bash
cd frontend
npx prisma studio
```

Then navigate to BlogPost table and check if posts are present.

---

## Need More Help?

1. Open browser console (F12) when on blog manager page
2. Check for any red error messages
3. Copy the error messages and provide them for further diagnosis
