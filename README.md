# Dating-App (Minimal, ohne Tailwind)

**Fix für Fehler:** `Missing semicolon (3:8)` in `next.config.js` – es fehlte ein Semikolon nach der Deklaration. Wurde ergänzt: `const nextConfig = {};`.

**Vorheriger Fix:** Der Decorators-Fehler wurde vermieden, indem wir auf einfache CSS-Styles via **styled-jsx** umgestellt haben (kein Tailwind, keine Babel-Plugins nötig).

## Einrichten
1. In Vercel unter *Environment Variables* setzen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. In Supabase unter *Authentication → Providers* ggf. **Google** aktivieren (Redirect-URL: `https://<dein-vercel-host>/` oder lokal `http://localhost:3000`).

## Start
- Lokal: `npm i` → `npm run dev` (optional)
- Vercel: Repo importieren → Deploy

## Tests
- **Bestehender Test**: `/api/self-test` → sollte `{ ok: true }` liefern, wenn die Variablen gesetzt sind.
- **Neue Tests**: Seite `/tests` im Browser öffnen. Sie prüft:
  1) Env-Variablen vorhanden
  2) Supabase-Client initialisiert
  3) API `/api/self-test` erreichbar
  4) **Neu:** API `/api/ping` antwortet

## Erwartetes Verhalten (bitte bestätigen)
Nach erfolgreichem Login: Soll die App aktuell **A)** nur „Willkommen + Logout“ zeigen (Status-Quo), **B)** direkt in ein **Profil-Setup** (Alter, Bio, Interessen) führen, oder **C)** in eine **Swipe/Explore**-Ansicht springen? Bitte A/B/C nennen, dann baue ich die nächste Ansicht.
