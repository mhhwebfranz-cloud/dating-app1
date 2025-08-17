export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* Global simple styles (no Tailwind) */}
      <style jsx global>{`
        html, body, #__next { height: 100%; margin: 0; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter, sans-serif; color: #111827; }
        .center { min-height: 100%; display: flex; align-items: center; justify-content: center; background: #f3f4f6; padding: 24px; }
        .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 1px 2px rgba(0,0,0,.05); max-width: 480px; width: 100%; }
        .title { font-size: 20px; font-weight: 600; margin: 0 0 12px; }
        .btn { cursor: pointer; border: 0; border-radius: 10px; padding: 12px 16px; font-weight: 600; }
        .btn-primary { background: #111827; color: #fff; }
        .btn-primary:hover { filter: brightness(0.95); }
        .btn-danger { background: #ef4444; color: #fff; }
        .btn-danger:hover { filter: brightness(0.95); }
        .muted { color: #6b7280; font-size: 14px; margin-top: 8px; }
        .stack { display: grid; gap: 12px; }
        .issues { background:#fff7ed; border:1px solid #fed7aa; color:#9a3412; padding:12px; border-radius:10px; }
        .ok { background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; padding:12px; border-radius:10px; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      `}</style>
    </>
  )
}
