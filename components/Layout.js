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
                                <svg width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1" fill="white">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.27281 2.91146C1.61747 2.98212 0.332822 4.38132 0.403478 6.03667L1.3174 27.4482C1.38806 29.1035 2.78726 30.3882 4.44261 30.3175L13.1898 29.9441L18.9804 37.2729L23.3439 29.5107L46.4044 28.5264C48.0597 28.4557 49.3444 27.0565 49.2737 25.4012L48.3598 3.98971C48.2892 2.33436 46.89 1.04972 45.2346 1.12037L3.27281 2.91146Z" />
                                    </mask>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.27281 2.91146C1.61747 2.98212 0.332822 4.38132 0.403478 6.03667L1.3174 27.4482C1.38806 29.1035 2.78726 30.3882 4.44261 30.3175L13.1898 29.9441L18.9804 37.2729L23.3439 29.5107L46.4044 28.5264C48.0597 28.4557 49.3444 27.0565 49.2737 25.4012L48.3598 3.98971C48.2892 2.33436 46.89 1.04972 45.2346 1.12037L3.27281 2.91146Z" fill="white" />
                                    <path d="M13.1898 29.9441L13.9744 29.3242L13.6576 28.9233L13.1471 28.945L13.1898 29.9441ZM18.9804 37.2729L18.1958 37.8928L19.1209 39.0637L19.8521 37.7629L18.9804 37.2729ZM23.3439 29.5107L23.3013 28.5116L22.7451 28.5354L22.4722 29.0207L23.3439 29.5107ZM1.40257 5.99403C1.35546 4.89046 2.2119 3.95766 3.31546 3.91055L3.23017 1.91237C1.02304 2.00658 -0.689821 3.87219 -0.595612 6.07932L1.40257 5.99403ZM2.31649 27.4055L1.40257 5.99403L-0.595612 6.07932L0.318313 27.4908L2.31649 27.4055ZM4.39996 29.3184C3.2964 29.3655 2.3636 28.5091 2.31649 27.4055L0.318313 27.4908C0.412521 29.6979 2.27812 31.4108 4.48525 31.3166L4.39996 29.3184ZM13.1471 28.945L4.39996 29.3184L4.48525 31.3166L13.2324 30.9432L13.1471 28.945ZM19.7651 36.6529L13.9744 29.3242L12.4051 30.5641L18.1958 37.8928L19.7651 36.6529ZM22.4722 29.0207L18.1087 36.7828L19.8521 37.7629L24.2156 30.0007L22.4722 29.0207ZM46.3618 27.5273L23.3013 28.5116L23.3866 30.5098L46.447 29.5255L46.3618 27.5273ZM48.2746 25.4438C48.3218 26.5474 47.4653 27.4802 46.3618 27.5273L46.447 29.5255C48.6542 29.4313 50.367 27.5657 50.2728 25.3586L48.2746 25.4438ZM47.3607 4.03235L48.2746 25.4438L50.2728 25.3586L49.3589 3.94706L47.3607 4.03235ZM45.2773 2.11946C46.3808 2.07236 47.3136 2.92879 47.3607 4.03235L49.3589 3.94706C49.2647 1.73993 47.3991 0.0270737 45.192 0.121282L45.2773 2.11946ZM3.31546 3.91055L45.2773 2.11946L45.192 0.121282L3.23017 1.91237L3.31546 3.91055Z" fill="black" mask="url(#path-1-inside-1)" />
                                    <line x1="8.58811" y1="10.1914" x2="39.5599" y2="8.86942" stroke="black" />
                                    <line x1="8.84397" y1="16.186" x2="39.8158" y2="14.864" stroke="black" />
                                    <line x1="9.09985" y1="22.1805" x2="40.0716" y2="20.8585" stroke="black" />
                                </svg>

                                <h1 className='is-size-5 ml-1'>Discussbase</h1>
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


                            {session
                                ? <>
                                    <Link href="/posts/create"><a className={'navbar-item'}>New+</a></Link>
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