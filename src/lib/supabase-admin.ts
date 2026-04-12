import { createClient } from '@supabase/supabase-js';

// Get environment variables and ensure they are not undefined/empty
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!supabaseUrl || !supabaseServiceKey) {
  if (typeof window === 'undefined') {
    console.error('CRITICAL: Supabase admin variables are missing in server environment.');
  }
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
