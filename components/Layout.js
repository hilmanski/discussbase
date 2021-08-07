import { useState, useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Layout({ children }) {
    const router = useRouter()
    const [session, setSession] = useState(supabase.auth.session())
    const [isActive, setisActive] = useState(false)

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Discuss-OS Supabase</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="navbar has-background-light mb-5 py-3" role="navigation" aria-label="main navigation">
                <div className="container is-max-desktop">
                    <div className="navbar-brand">
                        <Link href="/">
                            <a className="navbar-item">
                                <h1>Discuss OS supabase</h1>
                            </a>
                        </Link>

                        <a
                            onClick={() => {
                                setisActive(!isActive)
                            }}
                            role='button'
                            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                            aria-label='menu'
                            aria-expanded='false'
                            data-target='navbarTarget'
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id='navbarTarget' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                        <div className="navbar-end">
                            <Link href="/posts">
                                <a className={'navbar-item'}>Forum</a>
                            </Link>
                            <Link href="/posts/create">
                                <a className={'navbar-item'}>New+</a>
                            </Link>


                            {session
                                ? <>
                                    <Link href='/profile'><a className="navbar-item"> Profile </a></Link>
                                    <a className="navbar-item" onClick={() => {
                                        supabase.auth.signOut()
                                        router.push('/')
                                    }}> Log Out </a>
                                </>
                                : <Link href='/login'><a className={'navbar-item'}>Login</a></Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <div className="container is-fluid">
                    <div className="container is-max-desktop">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}