// pages/profile.js
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Profile() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ username: '', age: '', bio: '', interests: '', avatarFile: null })
  const [status, setStatus] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) setSession(session)
      mounted && setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  async function uploadAvatar(userId, file) {
    if (!file) return null
    const ext = file.name.split('.').pop()
    const path = `avatars/${userId}.${ext}`
    const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (upErr) throw upErr
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave(e) {
    e.preventDefault()
    setStatus('')
    if (!session) { setStatus('Bitte zuerst einloggen.'); return }

    // Validierung Alter
    const ageNum = parseInt(form.age, 10)
    if (!Number.isInteger(ageNum) || ageNum < 16 || ageNum > 35) {
      setStatus('Alter muss eine ganze Zahl zwischen 16 und 35 sein.')
      return
    }

    setLoading(true)
    try {
      let avatarUrl = null
      if (form.avatarFile) {
        avatarUrl = await uploadAvatar(session.user.id, form.avatarFile)
      }

      const updates = {
        id: session.user.id,
        username: form.username || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        age: ageNum,
        bio: form.bio,
        interests: form.interests ? form.interests.split(',').map(s => s.trim()).filter(Boolean) : [],
        avatar_url: avatarUrl,
        updated_at: new Date()
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) {
        setStatus('Fehler beim Speichern: ' + error.message)
      } else {
        setStatus('✅ Profil gespeichert!')
      }
    } catch (err) {
      setStatus('Upload-Fehler: ' + (err.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="center"><div className="card">Lade...</div></div>
  if (!session) return <div className="center"><div className="card">Bitte zuerst einloggen.</div></div>

  return (
    <div className="center">
      <div className="card stack">
        <h1 className="title">Profil einrichten</h1>
        <form onSubmit={handleSave} className="stack">
          <input placeholder="Benutzername" className="input" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
          <input type="number" placeholder="Alter" className="input" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
          <textarea placeholder="Kurz-Bio" className="input" rows={4} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
          <input placeholder="Interessen (komma-getrennt)" className="input" value={form.interests} onChange={e => setForm({...form, interests: e.target.value})} />
          <label className="muted">Avatar (optional)</label>
          <input type="file" accept="image/*" onChange={e => setForm({...form, avatarFile: e.target.files?.[0] || null})} />
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Speichern...' : 'Speichern'}</button>
        </form>
        {status && <div className="muted" style={{marginTop:8}}>{status}</div>}
      </div>
    </div>
  )
}
