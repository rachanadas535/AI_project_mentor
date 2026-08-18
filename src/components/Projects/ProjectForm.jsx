// Reusable form for creating and editing a project.
// Includes validation for name, description, and technology stack.

import { useState, useEffect } from 'react'

export default function ProjectForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: '',
  })
  const [errors, setErrors] = useState({})

  // Pre-fill the form when editing an existing project.
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        techStack: Array.isArray(initialData.techStack)
          ? initialData.techStack.join(', ')
          : initialData.techStack || '',
      })
    }
  }, [initialData])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear the error for this field when the user starts typing.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required.'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.'
    }
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Technology stack is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    // Convert the comma-separated tech stack into an array.
    const techStackArray = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSave({
      name: formData.name.trim(),
      description: formData.description.trim(),
      techStack: techStackArray,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Student Placement Portal"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Project Description</label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what the project does..."
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="techStack" className="form-label">Technology Stack</label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          className="form-input"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="e.g. React, FastAPI, SQL Server"
          aria-invalid={!!errors.techStack}
        />
        {errors.techStack && <p className="form-error">{errors.techStack}</p>}
        <p className="text-muted text-small mt-1">Separate technologies with commas.</p>
      </div>

      <div className="flex justify-between gap-1 mt-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Project
        </button>
      </div>
    </form>
  )
}
