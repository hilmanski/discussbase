import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const JWTSecret = process.env.JWT_SECRET

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    headers: {
        Authorization: `Bearer ${JWTSecret}`
    }
})