// Reusable empty state component shown when there is no data to display.

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-text-light)"
        strokeWidth="1.5"
        style={{ marginBottom: 16 }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <h3 style={{ marginBottom: 8, color: 'var(--color-text-muted)' }}>{title}</h3>
      {message && (
        <p className="text-muted" style={{ marginBottom: 20, maxWidth: 400 }}>
          {message}
        </p>
      )}
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
