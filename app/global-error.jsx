'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Application error</h1>
        <p style={{ color: '#57534e', marginBottom: '1.5rem' }}>
          A server-side exception occurred. If this is a new deployment, set these in your host (e.g. Vercel) Environment Variables:
        </p>
        <ul style={{ textAlign: 'left', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li><strong>DATABASE_URL</strong> – use a hosted database (Neon, Vercel Postgres, etc.). SQLite file does not work on Vercel.</li>
          <li><strong>NEXTAUTH_URL</strong> – your app URL (e.g. https://your-app.vercel.app)</li>
          <li><strong>NEXTAUTH_SECRET</strong> – a random string (e.g. run: openssl rand -base64 32)</li>
        </ul>
        <p style={{ color: '#57534e', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Then run database migrations (e.g. Prisma: npx prisma db push) against that database.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#c2410c', color: 'white', border: 'none', borderRadius: '6px' }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
