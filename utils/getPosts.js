import { supabase } from "./supabaseClient"

export default async function getPosts(context) {
    let tag = '*'
    let searchQ = ''
    let _currentPage = 1

    if (context.query.page) {
        _currentPage = context.query.page
    }

    if (context.query.query) {
        searchQ = context.query.query
    }

    if (context.query.tag) {
        tag = context.params.tag
    }

    let perPage = 14 //start from zero
    let range_start = 0
    let range_end = _currentPage * perPage

    if (_currentPage != 1)
        range_start = (_currentPage * perPage) - (perPage - 1)

    const { data: posts, error, count } = await supabase
        .from('posts')
        .select(`
                    *, 
                    owner:user_id(
                        id, username, avatar_url
                    ),
                    replies(id)
                `, { count: 'exact' })
        .ilike('title', `%${searchQ}%`)
        .ilike('tag', `${tag}`)
        .range(range_start, range_end)
        .order('updated_at', { ascending: false })
    
    return { posts, count, tag }
}