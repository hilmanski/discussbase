import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <Layout>
        <h1 className='is-size-2 is-size-4-mobile'>Discussbase</h1>
        <h2 className='is-size-4 mb-5'>An open-source forum <br></br>
          Create your discussion platform and deploy it completely free,
        Using &ldquo;Seven-stack&rdquo; (Supabase, Vercel and Next.js).
        Simplicity first. Focus on your discussion
      </h2>

      <div>
        <Link href='https://github.com/hilmanski/discussbase'><button className="button is-outlined mr-1">Source Code</button></Link>
        <Link href='https://docs-discussbase.vercel.app/'><button className="button is-outlined">Read Documentation</button></Link>
      </div>

        <div className='columns mt-6'>
          <div className='column'>
            <figure className='image is-64x64'>
              <Image width='64' height='64' className='is-rounded' src='https://pbs.twimg.com/profile_images/1397471927132844033/jN-wuufb_400x400.jpg' alt='supabase logo'/>
            </figure>
            <h3 className='mt-1 is-size-4'><a href='https://supabase.io/'> Supabase</a></h3>
            <p>Create a backend in less than 2 minutes. Start your project with a Postgres Database, Authentication, instant APIs, realtime subscriptions and Storage.</p>
          </div>

          <div className='column'>
            <figure className='image is-64x64'>
              <Image width='64' height='64' className='is-rounded' src='https://pbs.twimg.com/profile_images/1252531684353998848/6R0-p1Vf_400x400.jpg' alt='vercel logo' />
            </figure>
            <h3 className='mt-1 is-size-4'><a href='https://vercel.com/'> Vercel</a></h3>
            <p>Vercel is an open serverless platform for static and hybrid applications built to integrate with your headless content, commerce, or database.</p>
          </div>

          <div className='column'>
            <figure className='image is-64x64'>
              <Image width='64' height='64' className='is-rounded' src='https://camo.githubusercontent.com/92ec9eb7eeab7db4f5919e3205918918c42e6772562afb4112a2909c1aaaa875/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313630373535343338352f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6c6f676f2e706e67' alt='nextjs logo' />
            </figure>
            <h3 className='mt-1 is-size-4'><a href='https://nextjs.org/'> Nextjs</a></h3>
            <p>Next.js gives you the best developer experience with all the features you need for production.</p>
          </div>
        </div>
    </Layout>
  )
}