// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://shpxzvlqaykbsprgzbbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNocHh6dmxxYXlrYnNwcmd6YmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTkxMTksImV4cCI6MjA1ODI5NTExOX0._SHH14DlqTv8qcXtUomNYNH5hJYNQNSfLbip-vHszWc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);