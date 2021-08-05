import Head from 'next/head';
import Link from 'next/link'; 
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'

export default function Layout({ children }) {
    const user_session = supabase.auth.session()
    const [isActive, setisActive] = useState(false)

    return (
        <>
        <Head>
            <title>Discuss-OS Supabase</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="navbar has-background-light mb-5 py-3" role="navigation" aria-label="main navigation">
            <div className="container is-max-desktop">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1>Discuss OS supabase</h1>
                    </a>

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


                    { user_session 
                        ? <>
                            <Link href='/profile'><a className="navbar-item"> Profile </a></Link>
                            <a className="navbar-item" onClick={() => supabase.auth.signOut()}> Log Out </a>
                          </>
                        : <a href='/' className={'navbar-item'}>Login</a>
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