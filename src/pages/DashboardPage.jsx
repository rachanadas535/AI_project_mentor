// Dashboard page: summary cards, project progress, recent tasks, and AI recommendation.

import { useApp } from '../context/AppContext'
import { useOutletContext, Link } from 'react-router-dom'
import StatCard from '../components/Dashboard/StatCard'
import { StatusBadge, PriorityBadge } from '../components/Common/Badge'
import EmptyState from '../components/Common/EmptyState'

export default function DashboardPage() {
  const { dashboardStats, projectProgress, recentTasks, projects } = useApp()
  const { searchTerm } = useOutletContext()

  // Filter recent tasks by the header search term.
  const filteredRecentTasks = searchTerm
    ? recentTasks.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recentTasks

  // Pick a recommended next task: the first pending or in-progress task.
  const recommendedTask = recentTasks.find(
    (t) => t.status === 'Pending' || t.status === 'In Progress'
  )
  const recommendedProject = recommendedTask
    ? projects.find((p) => p.id === recommendedTask.projectId)
    : null

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your projects, tasks, and AI recommendations.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-4 section">
        <StatCard
          label="Total Projects"
          value={dashboardStats.totalProjects}
          color="#4f46e5"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Total Tasks"
          value={dashboardStats.totalTasks}
          color="#06b6d4"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          }
        />
        <StatCard
          label="Pending Tasks"
          value={dashboardStats.pendingTasks}
          color="#f59e0b"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
        <StatCard
          label="In Progress"
          value={dashboardStats.inProgressTasks}
          color="#3b82f6"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-9-9" />
              <path d="M21 3v9h-9" />
            </svg>
          }
        />
      </div>

      {/* Completed tasks as a secondary stat */}
      <div className="grid grid-4 section">
        <StatCard
          label="Completed Tasks"
          value={dashboardStats.completedTasks}
          color="#10b981"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
      </div>

      {/* Project Progress */}
      <div className="section">
        <h2 className="section-title">Project Progress</h2>
        {projectProgress.length === 0 ? (
          <div className="card">
            <EmptyState title="No projects yet" message="Create your first project to see progress here." />
          </div>
        ) : (
          <div className="grid grid-2">
            {projectProgress.map((project) => (
              <div className="card" key={project.id}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/projects/${project.id}`} className="fw-bold" style={{ fontSize: '1rem' }}>
                      {project.name}
                    </Link>
                    <span className="text-muted text-small">{project.percentage}%</span>
                  </div>
                  <div className="flex gap-1 mb-2" style={{ flexWrap: 'wrap' }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="badge badge-pending">{tech}</span>
                    ))}
                  </div>
                  <p className="text-muted text-small mb-1">
                    {project.completedTasks} of {project.totalTasks} tasks completed
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${project.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Tasks */}
      <div className="section">
        <h2 className="section-title">Recent Tasks</h2>
        {filteredRecentTasks.length === 0 ? (
          <div className="card">
            <EmptyState title="No tasks found" message="Tasks will appear here once they are created." />
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecentTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.projectId)
                  return (
                    <tr key={task.id}>
                      <td className="fw-bold">{task.title}</td>
                      <td>{project?.name || 'Unknown'}</td>
                      <td><PriorityBadge priority={task.priority} /></td>
                      <td><StatusBadge status={task.status} /></td>
                      <td className="text-muted text-small">{formatDate(task.updatedAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AI Recommended Next Task */}
      <div className="section">
        <h2 className="section-title">AI Recommended Next Task</h2>
        {recommendedTask ? (
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <div>
                  <p className="text-muted text-small mb-1">Project</p>
                  <p className="fw-bold">{recommendedProject?.name}</p>
                </div>
                <div style={{ flex: 1, minWidth: 200, marginLeft: 24 }}>
                  <p className="text-muted text-small mb-1">Recommended Task</p>
                  <p>{recommendedTask.title}</p>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p className="text-muted text-small mb-1">Reason</p>
                  <p className="text-small">
                    This task is {recommendedTask.status === 'Pending' ? 'pending and not yet started' : 'in progress and needs attention'}.
                    It has {recommendedTask.priority.toLowerCase()} priority and is blocking other work.
                  </p>
                </div>
                <Link to="/ai-mentor" className="btn btn-primary btn-sm">
                  View Recommendation
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <EmptyState title="No recommendations" message="All tasks are completed. Ask the AI Mentor for next steps." />
          </div>
        )}
      </div>
    </div>
  )
}
