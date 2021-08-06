import { supabase } from '../../utils/supabaseClient'
import Layout from '../../components/Layout';
import Link from 'next/link';
import Avatar from '../../components/Avatar';

export default function PostByTag({ user }) {
    return (
        <Layout>
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                    <Avatar username={user.username} avatar_url={user.avatar_url}></Avatar>
                    <p>@{user.username}</p>
                    {user.website &&
                        <p> <Link href={user.website}><a>{user.website}</a></Link> </p>
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { data: user, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('username', context.params.username)
        .single()

    if (!user) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            user
        },
    };
}
