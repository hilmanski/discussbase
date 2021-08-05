import { supabase } from '../../../utils/supabaseClient'
import jwt_decode from "jwt-decode";

export default async(req, res) => {
    const { body, reply_id, access_token } = req.body;

    const decoded = jwt_decode(access_token);
    const user_id = decoded.sub

    console.log(reply_id)
    try {
        supabase.auth.setAuth(access_token)
        const { data, error } =  await supabase
                  .from('replies')
                  .update({ body: body })
                  .match({ id: reply_id })
        
        let reply = data[0]

        res.status(200).json({ status: 'success', reply: reply })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}