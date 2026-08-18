// AI Mentor page: select a project, enter a requirement, and get a mock AI response.
// The response is structured into sections. Later this will call POST /api/ai/plan.

import { useState } from 'react'
import { useApp } from '../context/AppContext'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'

const TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

export default function AIMentorPage() {
  const { projects, addAIInteraction, generateAIRecommendation, addTask } = useApp()

  const [projectId, setProjectId] = useState('')
  const [requirement, setRequirement] = useState('')
  const [taskType, setTaskType] = useState(TASK_TYPES[1])
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState(null)
  const [savedProjectName, setSavedProjectName] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')

  async function handleGenerate(e) {
    e.preventDefault()
    setError('')

    if (!projectId) {
      setError('Please select a project.')
      return
    }
    if (!requirement.trim()) {
      setError('Please enter a requirement or question.')
      return
    }

    const project = projects.find((p) => p.id === projectId)
    setSavedProjectName(project?.name || '')

    setIsLoading(true)
    setAiResponse(null)

    try {
      const response = await generateAIRecommendation(
        project.name,
        requirement,
        taskType
      )
      setAiResponse(response)

      // Save the interaction to AI history.
      addAIInteraction({
        projectId,
        projectName: project.name,
        taskType,
        userPrompt: requirement,
        aiResponse: response,
      })
    } catch {
      setError('AI Mentor is temporarily unavailable. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleCreateTasks() {
    if (!aiResponse) return

    // Create tasks from the frontend and backend task lists in the AI response.
    const allTasks = [
      ...(aiResponse.frontendTasks || []),
      ...(aiResponse.backendTasks || []),
      ...(aiResponse.databaseTasks || []),
    ]

    allTasks.forEach((taskTitle) => {
      addTask({
        projectId,
        title: taskTitle,
        description: `AI-generated task from the "${taskType}" request: "${requirement}"`,
        priority: 'Medium',
        status: 'Pending',
        aiGenerated: true,
      })
    })

    setSuccessMsg(`${allTasks.length} tasks created from the AI recommendation.`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  function handleSave() {
    setSuccessMsg('Recommendation saved to AI History.')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function handleClear() {
    setAiResponse(null)
    setRequirement('')
    setProjectId('')
    setTaskType(TASK_TYPES[1])
    setError('')
  }

  return (
    <div>
      <div className="page-header">
        <h1>AI Mentor</h1>
        <p>Select a project and describe a requirement. The AI mentor will break it down into actionable tasks.</p>
      </div>

      {successMsg && <SuccessMessage message={successMsg} onDismiss={() => setSuccessMsg('')} />}

      <div className="grid grid-2">
        {/* Input form */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Request AI Recommendation</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleGenerate}>
              <div className="form-group">
                <label htmlFor="ai-project" className="form-label">Select Project</label>
                <select
                  id="ai-project"
                  className="form-select"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="">Choose a project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="ai-requirement" className="form-label">Requirement or Question</label>
                <textarea
                  id="ai-requirement"
                  className="form-textarea"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. I need to build a student registration form with email verification..."
                  rows={5}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ai-task-type" className="form-label">AI Task Type</label>
                <select
                  id="ai-task-type"
                  className="form-select"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                >
                  {TASK_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {error && <p className="form-error mb-2">{error}</p>}

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate AI Recommendation'}
              </button>
            </form>
          </div>
        </div>

        {/* Response area */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">AI Response</h2>
            {aiResponse && (
              <span className="badge badge-ai">GPT-OSS 120B</span>
            )}
          </div>
          <div className="card-body">
            {isLoading ? (
              <LoadingSpinner
                message="AI Mentor is analysing your project..."
                size="large"
              />
            ) : aiResponse ? (
              <div>
                {/* Structured response sections */}
                <ResponseSection title="Requirement Understanding" icon="brain">
                  <p>{aiResponse.requirementUnderstanding}</p>
                </ResponseSection>

                <ResponseSection title="Frontend Tasks" icon="monitor">
                  <TaskList items={aiResponse.frontendTasks} />
                </ResponseSection>

                <ResponseSection title="Backend Tasks" icon="server">
                  <TaskList items={aiResponse.backendTasks} />
                </ResponseSection>

                <ResponseSection title="Database Tasks" icon="database">
                  <TaskList items={aiResponse.databaseTasks} />
                </ResponseSection>

                <ResponseSection title="Testing Steps" icon="check">
                  <TaskList items={aiResponse.testingSteps} />
                </ResponseSection>

                <ResponseSection title="Possible Blockers" icon="alert">
                  <TaskList items={aiResponse.possibleBlockers} />
                </ResponseSection>

                <ResponseSection title="Recommended Next Action" icon="arrow">
                  <p className="fw-bold">{aiResponse.recommendedNextAction}</p>
                </ResponseSection>

                {/* Action buttons */}
                <div className="flex gap-1 mt-2 flex-wrap">
                  <button className="btn btn-secondary btn-sm" onClick={handleSave}>
                    Save Recommendation
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleCreateTasks}>
                    Create Tasks from Recommendation
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={handleClear}>
                    Clear Response
                  </button>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No response yet"
                message="Fill in the form and click Generate to get an AI recommendation."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component: a titled section within the AI response.
function ResponseSection({ title, icon, children }) {
  return (
    <div className="mb-2" style={{ marginBottom: 20 }}>
      <h3 className="flex items-center gap-1 mb-1" style={{ fontSize: '1rem' }}>
        {icon === 'brain' && <BrainIcon />}
        {icon === 'monitor' && <MonitorIcon />}
        {icon === 'server' && <ServerIcon />}
        {icon === 'database' && <DatabaseIcon />}
        {icon === 'check' && <CheckIcon />}
        {icon === 'alert' && <AlertIcon />}
        {icon === 'arrow' && <ArrowIcon />}
        {title}
      </h3>
      <div style={{ paddingLeft: 28 }}>{children}</div>
    </div>
  )
}

// Helper component: a bulleted list of tasks.
function TaskList({ items }) {
  if (!items || items.length === 0) return <p className="text-muted text-small">No items.</p>
  return (
    <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
      {items.map((item, i) => (
        <li key={i} className="text-small" style={{ marginBottom: 4 }}>{item}</li>
      ))}
    </ul>
  )
}

// --- Inline SVG icons ---

function BrainIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>
}
function MonitorIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
}
function ServerIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
}
function DatabaseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
}
function AlertIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
}
function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
}
