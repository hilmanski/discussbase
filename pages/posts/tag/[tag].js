import PostList from '../../../components/PostList';
import getPosts from '../../../utils/getPosts';

export default function PostByTag({ posts, tag,count }) {

    return (
        <PostList posts={posts} tag={tag} totalPosts={count}></PostList>
    )
}

export async function getServerSideProps(context) {
    const { posts, count, tag } = await getPosts(context)

    return {
        props: {
            tag, posts, count
        },
    };
}
