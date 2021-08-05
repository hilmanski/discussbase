import { supabase } from '../../../utils/supabaseClient'
import jwt_decode from "jwt-decode";
const slugify = require('slugify')

export default async(req, res) => {
    const { title, body, tag, access_token } = req.body;

    const decoded = jwt_decode(access_token);
    const user_id = decoded.sub

    const slug = slugify(title) + '-' + Date.now()

    try {
        supabase.auth.setAuth(access_token)
        const { error } = await supabase
            .from('posts')
            .insert({ 
                title: title,
                body: body,
                tag: tag,
                user_id: user_id,
                slug: slug
            }, { returning: "minimal" })
        
        res.status(200).json({ slug })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}