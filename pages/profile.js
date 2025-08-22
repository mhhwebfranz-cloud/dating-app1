
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Profile() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) setSession(session)
      if (session) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single().catch(() => ({ data: null }))
        if (mounted) setProfile(data)
      }
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  if (!session) return <div className="center"><div className="card">Bitte einloggen.</div></div>
  if (loading) return <div className="center"><div className="card">Lade...</div></div>

  return (
    <div className="center">
      <div className="card">
        <h1 className="title">Dein Profil</h1>
        {profile ? (
          <pre className="muted">{JSON.stringify(profile, null, 2)}</pre>
        ) : (
          <div className="muted">Kein Profil gefunden. Bitte anlegen.</div>
        )}
      </div>
    </div>
  )
}
