import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import AvatarForm from '../components/AvatarForm'
import { supabase } from '../utils/supabaseClient'

export default function Profile() {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        setUser(supabase.auth.user())
        getProfile() 
    }, [])

    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()
            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (error) {
                //if no profiles yet
                setError(true)
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
                setError(false)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true)

            //temporary validation
            if (username == null) {
                alert('username min 4 and max 12 characters')
                return
            }
            if (username.trim().length < 4 || username.trim().length > 12) {
                alert('username min 4 and max 12 characters')
                return
            }

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal',
            })

            if (error) {
                throw error
            }
        } catch (error) {
            if (error.message.includes('duplicate key value'))
                alert('username is alredy exists, pick another one')
            else if (error.message.includes('username'))
                alert("username can't be empty")
            else
                alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
        <div className="form-widget">
            <h1 className='is-size-2 mb-5'>Update Profile</h1>

            {error &&
                <div className='notification'>
                    <h3><b> Oops </b></h3>
                    Looks like you don&apos;t have any profile yet. Add your username
                </div>
            }

            <div className="field">
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                    <input id="email" className="input" type="text" value={user.email} disabled />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="username">Username</label>
                <div className="control">
                    <input id="username"
                        className="input"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="website">Website</label>
                <div className="control">
                    <input id="website"
                        className="input"
                        type="text"
                        value={website || ''}
                        onChange={(e) => setWebsite(e.target.value)} />
                </div>
            </div>

            <AvatarForm
                username={username}
                avatar_url={avatar_url}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ username, website, avatar_url: url })
                }}
            />

            <div>
                <button
                    className="button is-primary is-fullwidth"
                    onClick={() => updateProfile({ username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>
        </div>
        </Layout>
    )
}
