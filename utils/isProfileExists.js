import { supabase } from "./supabaseClient";

export default async function isProfileExists() {
    try {
        const user = supabase.auth.user()

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()

        if (error) {
            return false
        }

        return true
    } catch (error) {
        console.log(error.message)
    }
}