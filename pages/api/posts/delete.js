import { supabase } from '../../../utils/supabaseClient'

export default async (req, res) => {
    const { access_token, post_id } = req.body;
    
    try {
        supabase.auth.setAuth(access_token)
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .match({ id: post_id })

        res.status(200).json({ status: 'success' })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}