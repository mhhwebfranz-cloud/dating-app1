export default function handler(_req, res) {
  const ok = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  res.status(200).json({ ok, url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing', anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing' })
}
