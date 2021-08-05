import { supabase } from '../../../utils/supabaseClient'
import jwt_decode from "jwt-decode";

export default async(req, res) => {
    const { body, post_id, access_token } = req.body;

    const decoded = jwt_decode(access_token);
    const user_id = decoded.sub

    try {
        supabase.auth.setAuth(access_token)
        const { data, error } = await supabase
            .from('replies')
            .insert({ 
                body: body,
                user_id: user_id,
                post_id: post_id
            })
        
        let reply = data[0]
        if(!error) {
            const { data: user, error } = await supabase
                                      .from('profiles')
                                      .select('id, username')
                                      .eq('id', user_id)
                                      .single()

            reply['commenter_id'] = user.id
            reply['commenter_username'] = user.username
        }
        
        res.status(200).json({ status: 'success', reply: reply })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}