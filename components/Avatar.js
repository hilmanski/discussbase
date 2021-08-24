import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


export default function Avatar({username, avatar_url, size=64}) {
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        if (avatar_url) {
            downloadImage(avatar_url)
        }
    }, [avatar_url])

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (
        <>
        <figure className={`image is-${size}x${size}`}>
            { avatarUrl
                ? <Image unoptimized="false" className='is-rounded' alt="Avatar" width={size} height={size} src={avatarUrl} />
                : <Image className='is-rounded' alt="Avatar" width={size} height={size} 
                            src={'https://ui-avatars.com/api/?name='+username} />
            }
        </figure>
        </>
    )
}