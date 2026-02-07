#!/usr/bin/env node
/**
 * API Route Validator
 * Checks that critical API routes have all required HTTP method handlers
 *
 * This prevents deploying code that's missing required handlers,
 * which would cause 405 Method Not Allowed errors in production.
 *
 * Created: 2026-01-27
 */

const fs = require('fs');
const path = require('path');

// Define expected methods for critical routes
// Add new routes here as they become critical
const CRITICAL_ROUTES = {
  'api/support/tickets/route.ts': ['GET', 'POST'],
  'api/health/route.ts': ['GET'],
  'api/health/samples/route.ts': ['GET'],
  'api/health/database/route.ts': ['GET'],
  'api/contact/route.ts': ['POST'],
  'api/homepage-samples/list/route.ts': ['GET'],
};

console.log('API Route Validator');
console.log('==================');
console.log('');

let failures = 0;
let passes = 0;

for (const [routePath, expectedMethods] of Object.entries(CRITICAL_ROUTES)) {
  const fullPath = path.join(__dirname, '../app', routePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP: ${routePath} (file not found)`);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  let routeFailures = 0;

  for (const method of expectedMethods) {
    // Match both: export async function GET( and export function GET(
    const pattern = new RegExp(`export\\s+(async\\s+)?function\\s+${method}\\s*\\(`);
    if (!pattern.test(content)) {
      console.log(`FAIL: ${routePath} missing ${method} handler`);
      routeFailures++;
      failures++;
    }
  }

  if (routeFailures === 0) {
    console.log(`PASS: ${routePath}`);
    passes++;
  }
}

console.log('');
console.log('==================');

if (failures > 0) {
  console.log(`RESULT: ${failures} failure(s), ${passes} passed`);
  console.log('');
  console.log('Missing API handlers will cause 405 errors in production!');
  console.log('Add the missing handler functions to fix this.');
  process.exit(1);
} else {
  console.log(`RESULT: All ${passes} routes validated successfully`);
  process.exit(0);
}
