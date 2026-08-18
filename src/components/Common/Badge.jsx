// Reusable badge component for task priority and status.
// Maps each value to a CSS class with the appropriate colour.

const STATUS_CLASSES = {
  Pending: 'badge-pending',
  'In Progress': 'badge-in-progress',
  Completed: 'badge-completed',
}

const PRIORITY_CLASSES = {
  Low: 'badge-low',
  Medium: 'badge-medium',
  High: 'badge-high',
}

export function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_CLASSES[status] || 'badge-pending'}`}>
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }) {
  return (
    <span className={`badge ${PRIORITY_CLASSES[priority] || 'badge-medium'}`}>
      {priority}
    </span>
  )
}

export function AIBadge({ label = 'AI' }) {
  return <span className="badge badge-ai">{label}</span>
}

export default StatusBadge
