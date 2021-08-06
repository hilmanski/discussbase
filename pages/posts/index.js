import PostList from '../../components/PostList';
import getPosts from '../../utils/getPosts';

export default function Home({posts, count}) {
    return (
        <PostList posts={posts} totalPosts={count}></PostList>
    )
}

export async function getServerSideProps(context) {

    const {posts, count} = await getPosts(context)

    return {
        props: {
            posts, count
        },
    };
}
