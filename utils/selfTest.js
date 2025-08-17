export function runSelfTest() {
  const issues = []
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) issues.push('Fehlt: NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) issues.push('Fehlt: NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return issues
}
