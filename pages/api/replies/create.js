import { supabase } from '../../../utils/supabaseClient'
import jwt_decode from "jwt-decode";

const createReply = async(req, res) => {
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
            const { error: errsetTimestamp } = await supabase
                .rpc('set_timestamp', { post_id })
            console.log(errsetTimestamp)
        }
        
        res.status(200).json({ status: 'success', reply: reply })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export default createReply