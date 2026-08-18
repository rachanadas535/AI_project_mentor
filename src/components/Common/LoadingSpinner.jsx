// A simple loading spinner with an optional message.

export default function LoadingSpinner({ message = 'Loading...', size = 'medium' }) {
  const dimensions = size === 'large' ? 48 : size === 'small' ? 24 : 36

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: dimensions,
          height: dimensions,
          border: '4px solid var(--color-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
        aria-hidden="true"
      />
      <p className="text-muted">{message}</p>
    </div>
  )
}
