
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Tests() {
  const [results, setResults] = useState([])

  useEffect(() => {
    async function run() {
      const r = []
      const envOk = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      r.push({ name: 'Env Vars vorhanden', pass: envOk, details: envOk ? 'OK' : 'Fehlend' })

      try {
        const url = supabase.storage?.getPublicUrl ? 'client-ok' : 'client-missing'
        r.push({ name: 'Supabase Client initialisiert', pass: url === 'client-ok', details: url })
      } catch (e) {
        r.push({ name: 'Supabase Client initialisiert', pass: false, details: String(e) })
      }

      try {
        const res = await fetch('/api/self-test')
        const json = await res.json()
        r.push({ name: 'API /api/self-test', pass: json.ok === true, details: JSON.stringify(json) })
      } catch (e) {
        r.push({ name: 'API /api/self-test', pass: false, details: String(e) })
      }

      try {
        const res = await fetch('/api/ping')
        const json = await res.json()
        r.push({ name: 'API /api/ping', pass: json.pong === true, details: JSON.stringify(json) })
      } catch (e) {
        r.push({ name: 'API /api/ping', pass: false, details: String(e) })
      }

      setResults(r)
    }
    run()
  }, [])

  return (
    <div className="center">
      <div className="card">
        <h1 className="title">Lovebird – Tests</h1>
        <ul>
          {results.map((t) => (
            <li key={t.name} style={{marginBottom:8}}>
              <b>{t.name}:</b> {t.pass ? '✅ PASS' : '❌ FAIL'}
              <div className="muted">{t.details}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
