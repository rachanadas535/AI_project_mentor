// 404 Not Found page shown for unknown routes.

import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: 8 }}>404</h1>
      <h2 style={{ marginBottom: 8 }}>Page Not Found</h2>
      <p className="text-muted mb-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  )
}
