// Reusable success message banner.

export default function SuccessMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '12px 16px',
        background: 'var(--color-success-bg)',
        border: '1px solid #6ee7b7',
        borderRadius: 'var(--radius-md)',
        color: '#065f46',
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <span style={{ flex: 1, fontSize: 14 }}>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss message"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#065f46',
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
