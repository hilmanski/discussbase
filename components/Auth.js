import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            alert('Check your email for the login link! Look at spam folder if not in inbox.')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                <p className="description is-size-4">Sign in via magic link with your email</p>
                <div>
                    <input
                        className="input mb-2"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email)
                        }}
                        className="button is-primary"
                        disabled={loading}
                    >
                        <span>{loading ? 'Loading' : 'Send magic link'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}