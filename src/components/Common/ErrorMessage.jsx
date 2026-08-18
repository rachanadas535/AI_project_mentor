// Reusable error message banner.

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '12px 16px',
        background: 'var(--color-error-bg)',
        border: '1px solid #fca5a5',
        borderRadius: 'var(--radius-md)',
        color: '#991b1b',
        marginBottom: 16,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ flexShrink: 0, marginTop: 1 }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span style={{ flex: 1, fontSize: 14 }}>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#991b1b',
            fontSize: 20,
            lineHeight: 1,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          &times;
        </button>
      )}
    </div>
  )
}
