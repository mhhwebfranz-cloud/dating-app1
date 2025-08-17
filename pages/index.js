import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { runSelfTest } from '../utils/selfTest'

export default function Home() {
  const [session, setSession] = useState(null)
  const issues = runSelfTest()

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

  return (
    <div className="center">
      <div className="card stack">
        <h1 className="title">Lovebird – Login</h1>

        {issues.length > 0 && (
          <div className="issues">
            <b>Konfiguration unvollständig:</b>
            <ul>
              {issues.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <div className="muted">Setze die Variablen in Vercel → Project → Settings → Environment Variables.</div>
          </div>
        )}

        {!session ? (
          <>
            <button className="btn btn-primary" onClick={signInWithGoogle}>Mit Google einloggen</button>
            <p className="muted">Du wirst zu Google weitergeleitet und dann zurück in die App.</p>
          </>
        ) : (
          <>
            <div>Willkommen, <b>{session.user.email}</b></div>
            <button className="btn btn-danger" onClick={signOut}>Ausloggen</button>
          </>
        )}

        <div className="muted">Testfälle: Prüfe Login/Logout & ob in Supabase unter <i>auth.users</i> ein neuer Eintrag erscheint.</div>
        <div className="muted">Weitere Tests unter <span className="mono">/tests</span>.</div>
      </div>
    </div>
  )
}
