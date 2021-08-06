import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head'
import TimeAgo from 'react-timeago'
import capitalize from '../utils/capitalize';
import Avatar from './Avatar';

export default function PostList({ posts, totalPosts, tag = null }) {
    const [pathName, setPathName] = useState(null)
    const perPage = 15   
    const totalPage = Math.ceil(totalPosts/perPage)

    useEffect(() => {
        // component is mounted and window is available
        setPathName(window.location.pathname)
    }, []);


    return (
        <Layout>
            <Head>
                <title>All Posts - {tag} </title>
            </Head>
            <div>
                <section className="my-5">
                    <h1 className="title">Post {tag}</h1>
                    <h2 className="subtitle">
                        All Posts 
                    </h2>
                </section>

                <div className="columns is-mobile">
                    <div className="column is-hidden-mobile is-3">
                        <p className="is-size-5"> Categories </p>
                        <Link href='/posts'>
                            <a className="is-block py-1">All</a>
                        </Link>
                        <Link href='/posts/tag/help'>
                            <a className="is-block py-1">Help</a>
                        </Link>
                        <Link href='/posts/tag/share'>
                            <a className="is-block py-1">Share</a>
                        </Link>
                        <Link href='/posts/tag/intervew'>
                            <a className="is-block py-1">Interview</a>
                        </Link>
                    </div>

                    <div className="column">

                        <form className='columns is-mobile' action='/posts/search' method ='GET'>
                            <div className='column'>
                                <input className='input is-small' placeholder='type keyword..' type='search' name='query'/>
                            </div>
                            <div className='column is-3'>
                                <button className='button is-fullwidth is-small'>Search</button>
                            </div>
                        </form>

                        {posts.map((post) => (
                            <div className='is-flex is-flex-mobile mb-5' key={post.id}>
                                <div className='mr-2'>
                                    <Avatar username={post.owner.username} avatar_url={post.owner.avatar_url} />
                                </div>

                                <div className=''>
                                    <p> <Link href={'/posts/' + post.slug}>
                                        <a className='has-text-dark is-size-4 is-size-5-mobile'> {capitalize(post.title)} </a>
                                    </Link>
                                    </p>
                                    <p> <small className='has-text-grey'>
                                    <Link href={'/user/' + post.owner.username}> 
                                            <a className='has-text-grey'>@{post.owner.username} </a>
                                    </Link>
                                    posted <TimeAgo date={post.created_at} />
                                    | {post.replies.length} comments
                                    </small> </p>
                                </div>
                            </div>
                        ))}

                        {totalPage > 1 && 
                        <nav className="pagination mt-5" role="navigation" aria-label="pagination">
                            <ul className="pagination-list">
                                {
                                    Array(totalPage).fill(null).map((value, index) => (
                                        <li key={index}>
                                            <Link href={pathName + '?page=' + (index+1)}>
                                                <a className="pagination-link"> {index+1} </a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}