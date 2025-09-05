// Environment variable validation
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable is required');
}

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY environment variable is required');
}
