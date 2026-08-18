// Tasks page: table of all tasks with filters, search, and CRUD actions.

import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useOutletContext } from 'react-router-dom'
import TaskForm from '../components/Tasks/TaskForm'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import { StatusBadge, PriorityBadge, AIBadge } from '../components/Common/Badge'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Pending', 'In Progress', 'Completed']

export default function TasksPage() {
  const { tasks, projects, addTask, updateTask, updateTaskStatus, deleteTask } = useApp()
  const { searchTerm } = useOutletContext()

  const [showFormModal, setShowFormModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  // Local filter state.
  const [filterProject, setFilterProject] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [localSearch, setLocalSearch] = useState('')

  // Combine header search with local search.
  const activeSearch = (searchTerm || localSearch).toLowerCase()

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filterProject && task.projectId !== filterProject) return false
      if (filterPriority && task.priority !== filterPriority) return false
      if (filterStatus && task.status !== filterStatus) return false
      if (activeSearch && !task.title.toLowerCase().includes(activeSearch)) return false
      return true
    })
  }, [tasks, filterProject, filterPriority, filterStatus, activeSearch])

  function handleCreate() {
    setEditingTask(null)
    setShowFormModal(true)
  }

  function handleEdit(task) {
    setEditingTask(task)
    setShowFormModal(true)
  }

  function handleSave(data) {
    if (editingTask) {
      updateTask(editingTask.id, data)
      setSuccessMsg('Task updated successfully.')
    } else {
      addTask(data)
      setSuccessMsg('Task created successfully.')
    }
    setShowFormModal(false)
    setEditingTask(null)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function handleStatusChange(taskId, newStatus) {
    updateTaskStatus(taskId, newStatus)
    setSuccessMsg('Task status updated successfully.')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function handleDeleteConfirm() {
    if (deleteTarget) {
      deleteTask(deleteTarget.id)
      setSuccessMsg('Task deleted successfully.')
      setDeleteTarget(null)
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function getProjectName(projectId) {
    return projects.find((p) => p.id === projectId)?.name || 'Unknown'
  }

  function clearFilters() {
    setFilterProject('')
    setFilterPriority('')
    setFilterStatus('')
    setLocalSearch('')
  }

  return (
    <div>
      <div className="page-header flex items-center justify-between flex-wrap gap-1">
        <div>
          <h1>Tasks</h1>
          <p>View and manage all development tasks across projects.</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {successMsg && <SuccessMessage message={successMsg} onDismiss={() => setSuccessMsg('')} />}

      {/* Filters */}
      <div className="card section">
        <div className="card-body">
          <div className="grid grid-4">
            <div className="form-group mb-0">
              <label htmlFor="filter-search" className="form-label">Search Tasks</label>
              <input
                type="text"
                id="filter-search"
                className="form-input"
                placeholder="Search by task title..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
            <div className="form-group mb-0">
              <label htmlFor="filter-project" className="form-label">Project</label>
              <select
                id="filter-project"
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
              <label htmlFor="filter-priority" className="form-label">Priority</label>
              <select
                id="filter-priority"
                className="form-select"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <label htmlFor="filter-status" className="form-label">Status</label>
              <select
                id="filter-status"
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          {(filterProject || filterPriority || filterStatus || localSearch) && (
            <div className="mt-2">
              <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tasks table */}
      {filteredTasks.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No tasks found"
            message="No tasks match your filters. Try adjusting them or create a new task."
            actionLabel="Add Task"
            onAction={handleCreate}
          />
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Title</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>AI</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="text-muted text-small">{task.id}</td>
                  <td>
                    <p className="fw-bold">{task.title}</p>
                    <p className="text-muted text-small" style={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {task.description}
                    </p>
                  </td>
                  <td className="text-small">{getProjectName(task.projectId)}</td>
                  <td><PriorityBadge priority={task.priority} /></td>
                  <td><StatusBadge status={task.status} /></td>
                  <td>{task.aiGenerated ? <AIBadge /> : <span className="text-muted text-small">No</span>}</td>
                  <td className="text-muted text-small">{formatDate(task.createdAt)}</td>
                  <td className="text-muted text-small">{formatDate(task.updatedAt)}</td>
                  <td>
                    <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(task)}>
                        Edit
                      </button>
                      <select
                        className="form-select btn-sm"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}
                        aria-label={`Change status for ${task.title}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(task)}>
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

      {/* Create / Edit modal */}
      {showFormModal && (
        <Modal
          title={editingTask ? 'Edit Task' : 'Add Task'}
          onClose={() => setShowFormModal(false)}
        >
          <TaskForm
            initialData={editingTask}
            onSave={handleSave}
            onCancel={() => setShowFormModal(false)}
          />
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
