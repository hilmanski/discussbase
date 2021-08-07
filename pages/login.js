import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const [session, setSession] = useState(supabase.auth.session())

    if (session)
        router.push('/posts')

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <Layout>
            {!session && < Auth /> }
        </Layout>
    )
}