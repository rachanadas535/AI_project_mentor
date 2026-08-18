// Reusable form for creating and editing a task.
// Includes project selection, title, description, priority, status, and AI-generated checkbox.

import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Pending', 'In Progress', 'Completed']

export default function TaskForm({ initialData, onSave, onCancel }) {
  const { projects } = useApp()

  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
  })
  const [errors, setErrors] = useState({})

  // Pre-fill the form when editing an existing task.
  useEffect(() => {
    if (initialData) {
      setFormData({
        projectId: initialData.projectId || '',
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
        aiGenerated: initialData.aiGenerated || false,
      })
    } else if (projects.length > 0) {
      // Default to the first project for new tasks.
      setFormData((prev) => ({ ...prev, projectId: projects[0].id }))
    }
  }, [initialData, projects])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!formData.projectId) {
      newErrors.projectId = 'Please select a project.'
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="projectId" className="form-label">Select Project</label>
        <select
          id="projectId"
          name="projectId"
          className="form-select"
          value={formData.projectId}
          onChange={handleChange}
          aria-invalid={!!errors.projectId}
        >
          <option value="">Choose a project...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && <p className="form-error">{errors.projectId}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="title" className="form-label">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-input"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Build login form"
          aria-invalid={!!errors.title}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Task Description</label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what needs to be done..."
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="aiGenerated"
            checked={formData.aiGenerated}
            onChange={handleChange}
          />
          <span>AI Generated Task</span>
        </label>
      </div>

      <div className="flex justify-between gap-1 mt-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
      </div>
    </form>
  )
}
