import PostList from '../../../components/PostList';
import { supabase } from '../../../utils/supabaseClient'

export default function PostByTag({ posts,tag,count }) {

    return (
        <PostList posts={posts} tag={tag} totalPosts={count}></PostList>
    )
}

export async function getServerSideProps(context) {
    let _currentPage = 1
    if (context.query.page) {
        _currentPage = context.query.page
    }

    let perPage = 14 //start from zero
    let range_start = 0
    let range_end = _currentPage * perPage

    if (_currentPage != 1)
        range_start = (_currentPage * perPage) - (perPage - 1)

    const tag = context.params.tag
    const { data: posts, error, count } = await supabase
        .from('posts')
        .select(`
                    *, 
                    owner:user_id(
                        id, username, avatar_url
                    ),
                    replies(id)
                `, { count: 'exact' })
        .eq('tag', tag)
        .range(range_start, range_end)
        .order('updated_at', { ascending: false })
        
        console.log(posts)

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            tag, posts, count
        },
    };
}
