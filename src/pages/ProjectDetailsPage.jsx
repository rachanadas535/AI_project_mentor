// Project Details page: shows one project's info, progress, and its tasks.

import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { StatusBadge, PriorityBadge, AIBadge } from '../components/Common/Badge'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProjectById, getTasksByProject, updateTaskStatus, deleteTask } = useApp()

  const [successMsg, setSuccessMsg] = useState('')
  const [statusChangeTask, setStatusChangeTask] = useState(null)

  const project = getProjectById(id)
  const projectTasks = useMemo(() => getTasksByProject(id), [getTasksByProject, id])

  if (!project) {
    return (
      <div className="card">
        <EmptyState
          title="Project not found"
          message="The project you are looking for does not exist or has been deleted."
          actionLabel="Back to Projects"
          onAction={() => navigate('/projects')}
        />
      </div>
    )
  }

  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const total = projectTasks.length
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function handleStatusChange(taskId, newStatus) {
    updateTaskStatus(taskId, newStatus)
    setSuccessMsg('Task status updated successfully.')
    setStatusChangeTask(null)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div>
      {successMsg && <SuccessMessage message={successMsg} onDismiss={() => setSuccessMsg('')} />}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 mb-2 text-small">
        <Link to="/projects">Projects</Link>
        <span className="text-muted">/</span>
        <span className="text-muted">{project.name}</span>
      </div>

      <div className="page-header flex items-center justify-between flex-wrap gap-1">
        <div>
          <h1>{project.name}</h1>
          <p className="text-muted">ID: {project.id} | Created on {formatDate(project.createdAt)}</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Link to={`/tasks?project=${project.id}`} className="btn btn-primary btn-sm">
            Add Task
          </Link>
          <Link to="/projects" className="btn btn-primary btn-sm">
            Edit Project
          </Link>
          <Link to="/ai-mentor" className="btn btn-secondary btn-sm">
            Ask AI Mentor
          </Link>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/projects')}>
            Return to Projects
          </button>
        </div>
      </div>

      {/* Project info card */}
      <div className="card section">
        <div className="card-body">
          <div className="grid grid-3">
            <div>
              <p className="text-muted text-small mb-1">Description</p>
              <p>{project.description}</p>
            </div>
            <div>
              <p className="text-muted text-small mb-1">Technology Stack</p>
              <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
                {project.techStack.map((tech) => (
                  <span key={tech} className="badge badge-pending">{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted text-small mb-1">Progress</p>
              <p className="fw-bold mb-1">{completed} of {total} tasks completed ({percentage}%)</p>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks belonging to this project */}
      <div className="section">
        <h2 className="section-title">Tasks</h2>
        {projectTasks.length === 0 ? (
          <div className="card">
            <EmptyState
              title="No tasks yet"
              message="Add tasks to this project to track your work."
              actionLabel="Go to Tasks"
              onAction={() => navigate('/tasks')}
            />
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <p className="fw-bold">{task.title}</p>
                      <p className="text-muted text-small" style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {task.description}
                      </p>
                    </td>
                    <td><PriorityBadge priority={task.priority} /></td>
                    <td><StatusBadge status={task.status} /></td>
                    <td>{task.aiGenerated ? <AIBadge /> : <span className="text-muted text-small">No</span>}</td>
                    <td className="text-muted text-small">{formatDate(task.updatedAt)}</td>
                    <td>
                      {statusChangeTask === task.id ? (
                        <select
                          className="form-select btn-sm"
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          autoFocus
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setStatusChangeTask(task.id)}
                        >
                          Change Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
