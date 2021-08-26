import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
//const JWTSecret = process.env.JWT_SECRET

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)