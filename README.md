# Dating-App mit Profil-Setup

**Features:**
- Google Login über Supabase
- Nach Login wird automatisch ein **Profil-Setup** (Alter, Bio, Interessen) abgefragt
- Daten werden momentan **nur in der Konsole geloggt** (Demo-Version)

## Installation
```bash
npm install
npm run dev
```

## Deployment
- Stelle sicher, dass in **Vercel → Settings → Environment Variables** gesetzt sind:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Nächster Schritt
Wenn du möchtest, dass die Profil-Daten **dauerhaft in Supabase gespeichert** werden, baue ich dir das als Nächstes ein ✅
