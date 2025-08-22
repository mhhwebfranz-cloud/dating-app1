
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Home() {
  const [session, setSession] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) setSession(session)

      supabase.auth.onAuthStateChange((_event, newSession) => {
        if (mounted) setSession(newSession)
      })
    })()
    return () => { mounted = false }
  }, [])

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  if (!session) {
    return (
      <div className="center">
        <div className="card">
          <h1 className="title">Lovebird – Login</h1>
          <button className="btn-primary" onClick={signInWithGoogle}>Mit Google einloggen</button>
        </div>
      </div>
    )
  }

  if (!profileComplete) {
    return <ProfileSetup onComplete={() => setProfileComplete(true)} />
  }

  return (
    <div className="center">
      <div className="card">
        <h1 className="title">Willkommen, {session.user?.email}</h1>
        <p>Dein Profil ist eingerichtet 🎉</p>
        <button onClick={signOut}>Ausloggen</button>
      </div>
    </div>
  )
}

function ProfileSetup({ onComplete }) {
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('Profil gespeichert:', { age, bio, interests })
    onComplete()
  }

  return (
    <div className="center">
      <div className="card">
        <h1 className="title">Profil einrichten</h1>
        <form onSubmit={handleSubmit}>
          <input className="input" type="number" placeholder="Alter" value={age} onChange={(e) => setAge(e.target.value)} required />
          <textarea className="input" placeholder="Kurze Bio" value={bio} onChange={(e) => setBio(e.target.value)} style={{minHeight:100}} required />
          <input className="input" type="text" placeholder="Interessen (kommagetrennt)" value={interests} onChange={(e) => setInterests(e.target.value)} required />
          <button className="btn-primary" type="submit">Speichern</button>
        </form>
      </div>
    </div>
  )
}
