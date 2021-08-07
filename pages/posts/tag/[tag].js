import PostList from '../../../components/PostList';
import getCategories from '../../../utils/getCategories';
import getPosts from '../../../utils/getPosts';

export default function PostByTag({ posts, category,count }) {

    return (
        <PostList posts={posts} category={category} totalPosts={count}></PostList>
    )
}

export async function getServerSideProps(context) {
    const { posts, count, tag } = await getPosts(context)

    const categories = getCategories()
    const category = categories.find(item => item.key === tag);

    return {
        props: {
            category, posts, count
        },
    };
}
