import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link';
import Head from 'next/head'
import Reply from '../../components/Reply';
import TimeAgo from 'react-timeago'
import capitalize from '../../utils/capitalize';
import Avatar from '../../components/Avatar';
import ReactMarkdown from 'react-markdown'

export default function Post({post}) {
    const [owner, setOwner] = useState(false)
    const user_session = supabase.auth.session()
    
    useEffect(() => {
        if (user_session) {
            if (user_session.user.id == post.owner.id) {
                setOwner(true)
            }
        }
    }, [user_session, post.owner.id])

    async function confirmDelete(e) {
        e.preventDefault();
        const result = confirm('Are you sure you want to delete this post?')
        
        if(result == true) {

            let formData = {
                post_id : post.id,
                access_token : user_session.access_token
            }

            fetch('/api/posts/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
                .then(data => {
                    window.location.href = '/posts'
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <Layout>
        <Head>
         <title>{post.title}</title>
         <meta name="description" content={post.body.substring(0,140).trim()} />
       </Head>
            <div className="columns">
            
            <div className="column">
                <div className="is-flex-mobile">
                <Avatar username={post.owner.username} avatar_url={post.owner.avatar_url} size="48"/>
                <div>
                <p> <Link href={'/user/' + post.owner.username}><a className='has-text-dark'>@{post.owner.username} </a></Link> 
                      posted <TimeAgo date={post.created_at} /></p>
                <p> <Link href={'/posts/tag/' + post.tag}><a className='tag is-link is-light'>{post.tag}</a></Link></p>
                </div>
                </div>

                {owner &&
                    <div className='mt-2'>
                        <Link href={'/posts/create?post=' + post.slug}><a className='is-block'> Edit </a></Link>
                        <a className='is-block' onClick={confirmDelete}>Delete</a>
                    </div>
                }
            </div>


            <div className="column is-four-fifths">
                <h1 className='is-size-3 mb-2'>{capitalize(post.title)}</h1>
                <div className='mb-4'>
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>

                <Reply post_id={post.id} replies={post.replies} />
            </div>
        </div>

        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { data: post, error } = await supabase
        .from('posts')
        .select(`
                    *, 
                    owner:user_id(
                        id, username, avatar_url
                    ),
                    replies(
                        id, body, created_at,
                        commenter:user_id(id, username, avatar_url)
                    )
                `)
        .eq('slug', context.params.slug)
        .single()
    
    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post: post,
        },
    };
}
