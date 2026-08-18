// AI History page: displays previous AI interactions with filters and detail view.

import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useOutletContext } from 'react-router-dom'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import { AIBadge } from '../components/Common/Badge'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'

const TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

export default function AIHistoryPage() {
  const { aiHistory, projects, deleteAIInteraction } = useApp()
  const { searchTerm } = useOutletContext()

  const [viewTarget, setViewTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  const [filterProject, setFilterProject] = useState('')
  const [filterTaskType, setFilterTaskType] = useState('')
  const [filterDate, setFilterDate] = useState('')

  const filteredHistory = useMemo(() => {
    return aiHistory.filter((item) => {
      if (filterProject && item.projectId !== filterProject) return false
      if (filterTaskType && item.taskType !== filterTaskType) return false
      if (filterDate) {
        const itemDate = new Date(item.createdAt).toISOString().split('T')[0]
        if (itemDate !== filterDate) return false
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        if (
          !item.userPrompt.toLowerCase().includes(term) &&
          !item.projectName.toLowerCase().includes(term)
        ) {
          return false
        }
      }
      return true
    })
  }, [aiHistory, filterProject, filterTaskType, filterDate, searchTerm])

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function handleDeleteConfirm() {
    if (deleteTarget) {
      deleteAIInteraction(deleteTarget.id)
      setSuccessMsg('AI interaction deleted successfully.')
      setDeleteTarget(null)
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  function clearFilters() {
    setFilterProject('')
    setFilterTaskType('')
    setFilterDate('')
  }

  function getResponsePreview(response) {
    if (typeof response === 'string') return response.substring(0, 120) + '...'
    if (response?.requirementUnderstanding) {
      return response.requirementUnderstanding.substring(0, 120) + '...'
    }
    return 'No preview available.'
  }

  return (
    <div>
      <div className="page-header">
        <h1>AI History</h1>
        <p>Review previous AI mentor interactions and recommendations.</p>
      </div>

      {successMsg && <SuccessMessage message={successMsg} onDismiss={() => setSuccessMsg('')} />}

      {/* Filters */}
      <div className="card section">
        <div className="card-body">
          <div className="grid grid-3">
            <div className="form-group mb-0">
              <label htmlFor="hist-filter-project" className="form-label">Project</label>
              <select
                id="hist-filter-project"
                className="form-select"
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
              >
                <option value="">All Projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <label htmlFor="hist-filter-type" className="form-label">AI Task Type</label>
              <select
                id="hist-filter-type"
                className="form-select"
                value={filterTaskType}
                onChange={(e) => setFilterTaskType(e.target.value)}
              >
                <option value="">All Types</option>
                {TASK_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <label htmlFor="hist-filter-date" className="form-label">Date</label>
              <input
                type="date"
                id="hist-filter-date"
                className="form-input"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
          {(filterProject || filterTaskType || filterDate) && (
            <div className="mt-2">
              <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* History table */}
      {filteredHistory.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No AI interactions found"
            message="No interactions match your filters. Use the AI Mentor page to generate a recommendation."
          />
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>User Prompt</th>
                <th>AI Response Preview</th>
                <th>Task Type</th>
                <th>Model</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted text-small">{item.id}</td>
                  <td className="fw-bold text-small">{item.projectName}</td>
                  <td className="text-small" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.userPrompt}
                  </td>
                  <td className="text-muted text-small" style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {getResponsePreview(item.aiResponse)}
                  </td>
                  <td><span className="badge badge-pending">{item.taskType}</span></td>
                  <td><AIBadge label={item.modelName} /></td>
                  <td className="text-muted text-small">{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-secondary btn-sm" onClick={() => setViewTarget(item)}>
                        View
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(item)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View complete response modal */}
      {viewTarget && (
        <Modal
          title="AI Interaction Details"
          onClose={() => setViewTarget(null)}
          maxWidth={680}
        >
          <div className="mb-2">
            <p className="text-muted text-small mb-1">Interaction ID</p>
            <p className="fw-bold">{viewTarget.id}</p>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">Project</p>
            <p className="fw-bold">{viewTarget.projectName}</p>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">Task Type</p>
            <p>{viewTarget.taskType}</p>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">Model</p>
            <p><AIBadge label={viewTarget.modelName} /></p>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">Created</p>
            <p>{formatDateTime(viewTarget.createdAt)}</p>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">User Prompt</p>
            <div style={{ background: 'var(--color-surface-alt)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <p>{viewTarget.userPrompt}</p>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-muted text-small mb-1">AI Response</p>
            <div style={{ background: 'var(--color-surface-alt)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              {viewTarget.aiResponse && typeof viewTarget.aiResponse === 'object' ? (
                <div>
                  <ResponseDetail label="Requirement Understanding" text={viewTarget.aiResponse.requirementUnderstanding} />
                  <ResponseDetailList label="Frontend Tasks" items={viewTarget.aiResponse.frontendTasks} />
                  <ResponseDetailList label="Backend Tasks" items={viewTarget.aiResponse.backendTasks} />
                  <ResponseDetailList label="Database Tasks" items={viewTarget.aiResponse.databaseTasks} />
                  <ResponseDetailList label="Testing Steps" items={viewTarget.aiResponse.testingSteps} />
                  <ResponseDetailList label="Possible Blockers" items={viewTarget.aiResponse.possibleBlockers} />
                  <ResponseDetail label="Recommended Next Action" text={viewTarget.aiResponse.recommendedNextAction} />
                </div>
              ) : (
                <p>{viewTarget.aiResponse}</p>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete AI Interaction"
          message={`Are you sure you want to delete this AI interaction from "${deleteTarget.projectName}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

function ResponseDetail({ label, text }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p className="fw-bold text-small mb-1">{label}</p>
      <p className="text-small">{text}</p>
    </div>
  )
}

function ResponseDetailList({ label, items }) {
  if (!items || items.length === 0) return null
  return (
    <div style={{ marginBottom: 12 }}>
      <p className="fw-bold text-small mb-1">{label}</p>
      <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
        {items.map((item, i) => (
          <li key={i} className="text-small" style={{ marginBottom: 4 }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
