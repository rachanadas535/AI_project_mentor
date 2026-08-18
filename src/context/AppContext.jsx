// AppContext provides shared state for projects, tasks, and AI history.
// It uses mock data for now. When the FastAPI backend is ready, replace the
// mock data imports with calls to the functions in src/services/api.js.

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
  generateMockAIResponse,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [aiHistory, setAIHistory] = useState(mockAIHistory)

  // --- Project CRUD ---

  const addProject = useCallback((data) => {
    const newProject = {
      id: `p${Date.now()}`,
      name: data.name,
      description: data.description,
      techStack: data.techStack,
      createdAt: new Date().toISOString(),
    }
    setProjects((prev) => [...prev, newProject])
    return newProject
  }, [])

  const updateProject = useCallback((projectId, data) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, ...data, techStack: data.techStack } : p
      )
    )
  }, [])

  const deleteProject = useCallback((projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
    // Also remove tasks belonging to the deleted project.
    setTasks((prev) => prev.filter((t) => t.projectId !== projectId))
  }, [])

  const getProjectById = useCallback(
    (projectId) => projects.find((p) => p.id === projectId),
    [projects]
  )

  // --- Task CRUD ---

  const addTask = useCallback((data) => {
    const newTask = {
      id: `t${Date.now()}`,
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      aiGenerated: data.aiGenerated || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
    return newTask
  }, [])

  const updateTask = useCallback((taskId, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    )
  }, [])

  const updateTaskStatus = useCallback((taskId, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    )
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  const getTaskById = useCallback(
    (taskId) => tasks.find((t) => t.id === taskId),
    [tasks]
  )

  const getTasksByProject = useCallback(
    (projectId) => tasks.filter((t) => t.projectId === projectId),
    [tasks]
  )

  // --- AI History ---

  const addAIInteraction = useCallback((interaction) => {
    const newInteraction = {
      id: `ai${Date.now()}`,
      createdAt: new Date().toISOString(),
      modelName: 'GPT-OSS 120B',
      ...interaction,
    }
    setAIHistory((prev) => [newInteraction, ...prev])
    return newInteraction
  }, [])

  const deleteAIInteraction = useCallback((interactionId) => {
    setAIHistory((prev) => prev.filter((a) => a.id !== interactionId))
  }, [])

  // --- AI mock generation ---

  const generateAIRecommendation = useCallback((projectName, requirement, taskType) => {
    // Simulate a network delay so the loading indicator is visible.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockAIResponse(projectName, requirement, taskType))
      }, 1500)
    })
  }, [])

  // --- Dashboard statistics ---

  const dashboardStats = useMemo(() => {
    const totalProjects = projects.length
    const totalTasks = tasks.length
    const pendingTasks = tasks.filter((t) => t.status === 'Pending').length
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length

    return {
      totalProjects,
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    }
  }, [projects, tasks])

  // Project progress data for the dashboard.
  const projectProgress = useMemo(() => {
    return projects.map((project) => {
      const projectTasks = tasks.filter((t) => t.projectId === project.id)
      const total = projectTasks.length
      const completed = projectTasks.filter((t) => t.status === 'Completed').length
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
      return {
        ...project,
        totalTasks: total,
        completedTasks: completed,
        percentage,
      }
    })
  }, [projects, tasks])

  // Recent tasks (sorted by updatedAt descending, top 5).
  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
  }, [tasks])

  const value = {
    projects,
    tasks,
    aiHistory,
    dashboardStats,
    projectProgress,
    recentTasks,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getTaskById,
    getTasksByProject,
    addAIInteraction,
    deleteAIInteraction,
    generateAIRecommendation,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook so components can access the context easily.
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
