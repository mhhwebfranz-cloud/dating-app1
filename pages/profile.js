import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Profile() {
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [saved, setSaved] = useState(false)

  // Datei auswählen
  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0])
    }
  }

  // Bild hochladen
  async function uploadAvatar(file, userId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}.${fileExt}`
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    if (error) {
      console.error('Upload-Fehler:', error)
      return null
    }

    const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName)
    return publicUrl
  }

  async function saveProfile() {
    setSaved(false)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let uploadedUrl = avatarUrl
    if (avatar) {
      uploadedUrl = await uploadAvatar(avatar, user.id)
      setAvatarUrl(uploadedUrl)
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      age,
      bio,
      interests,
      avatar_url: uploadedUrl
    })

    if (!error) setSaved(true)
  }

  return (
    <div className="center">
      <div className="card stack">
        <h1 className="title">Profil einrichten</h1>

        <input className="input" placeholder="Alter" value={age} onChange={(e) => setAge(e.target.value)} />
        <textarea className="input" placeholder="Kurz-Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <input className="input" placeholder="Interessen (kommagetrennt)" value={interests} onChange={(e) => setInterests(e.target.value)} />

        <label className="muted">Profilbild hochladen:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{width: 100, height: 100, borderRadius: 50, marginTop: 8}} />}

        <button className="btn btn-primary" onClick={saveProfile}>Speichern</button>
        {saved && <div className="ok">✅ Profil gespeichert!</div>}
      </div>
    </div>
  )
}
