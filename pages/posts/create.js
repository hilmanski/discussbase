import { useRouter } from 'next/router'
import PostForm from '../../components/PostForm'

export default function Create() {
    const router = useRouter()

    return (
        <PostForm slug={router.query.post} />
    )
}

