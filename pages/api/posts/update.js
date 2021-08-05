import { supabase } from '../../../utils/supabaseClient'

export default async(req, res) => {
    const { title, body, tag, access_token, slug } = req.body;
    
    try {
        supabase.auth.setAuth(access_token)
        const { data, error } = await supabase
            .from('posts')
            .update({ 
                title: title,
                body: body,
                tag: tag
            })
            .match({ slug })
        
        res.status(200).json({ slug })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}