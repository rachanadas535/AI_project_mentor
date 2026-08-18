// Projects page: list of projects as cards with view, edit, and delete actions.

import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useOutletContext, Link } from 'react-router-dom'
import ProjectForm from '../components/Projects/ProjectForm'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'

export default function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, deleteProject } = useApp()
  const { searchTerm } = useOutletContext()

  const [showFormModal, setShowFormModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  // Filter projects by the header search term.
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects
    return projects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects, searchTerm])

  function handleCreate() {
    setEditingProject(null)
    setShowFormModal(true)
  }

  function handleEdit(project) {
    setEditingProject(project)
    setShowFormModal(true)
  }

  function handleSave(data) {
    if (editingProject) {
      updateProject(editingProject.id, data)
      setSuccessMsg('Project updated successfully.')
    } else {
      addProject(data)
      setSuccessMsg('Project created successfully.')
    }
    setShowFormModal(false)
    setEditingProject(null)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function handleDeleteConfirm() {
    if (deleteTarget) {
      deleteProject(deleteTarget.id)
      setSuccessMsg('Project deleted successfully.')
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

  function getProjectTaskStats(projectId) {
    const projectTasks = tasks.filter((t) => t.projectId === projectId)
    const completed = projectTasks.filter((t) => t.status === 'Completed').length
    return { total: projectTasks.length, completed }
  }

  return (
    <div>
      <div className="page-header flex items-center justify-between flex-wrap gap-1">
        <div>
          <h1>Projects</h1>
          <p>Manage your software projects and their details.</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Project
        </button>
      </div>

      {successMsg && <SuccessMessage message={successMsg} onDismiss={() => setSuccessMsg('')} />}

      {filteredProjects.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No projects found"
            message="Create your first project to get started."
            actionLabel="Create Project"
            onAction={handleCreate}
          />
        </div>
      ) : (
        <div className="grid grid-auto">
          {filteredProjects.map((project) => {
            const stats = getProjectTaskStats(project.id)
            const percentage = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)
            return (
              <div className="card" key={project.id}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted text-small">ID: {project.id}</span>
                    <span className="text-muted text-small">{formatDate(project.createdAt)}</span>
                  </div>
                  <h3 className="mb-1" style={{ fontSize: '1.1rem' }}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  </h3>
                  <p className="text-muted text-small mb-2" style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {project.description}
                  </p>
                  <div className="flex gap-1 mb-2" style={{ flexWrap: 'wrap' }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="badge badge-pending">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-small text-muted">
                      {stats.completed}/{stats.total} tasks completed
                    </span>
                    <span className="text-small fw-bold">{percentage}%</span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Link to={`/projects/${project.id}`} className="btn btn-secondary btn-sm">
                      View
                    </Link>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(project)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(project)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create / Edit modal */}
      {showFormModal && (
        <Modal
          title={editingProject ? 'Edit Project' : 'Create Project'}
          onClose={() => setShowFormModal(false)}
        >
          <ProjectForm
            initialData={editingProject}
            onSave={handleSave}
            onCancel={() => setShowFormModal(false)}
          />
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This will also remove all tasks belonging to this project. This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
