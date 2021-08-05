import PostList from '../../components/PostList';
import { supabase } from '../../utils/supabaseClient'

export default function Home({posts, count}) {
    return (
        <PostList posts={posts} totalPosts={count}></PostList>
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
    
    const { data: posts, error, count } = await supabase
        .from('posts')
        .select(`
                    *, 
                    owner:user_id(
                        id, username, avatar_url
                    ),
                    replies(id)
                `, { count: 'exact' })
        .range(range_start, range_end)
        .order('updated_at', { ascending: false })

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts, count
        },
    };
}
