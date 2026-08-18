// Axios service for future backend API communication.
// The React frontend currently uses mock data (see src/data/mockData.js).
// When the Python FastAPI backend is ready, set VITE_USE_MOCK_DATA=false in your .env file
// and these functions will automatically call the real backend endpoints.

import axios from 'axios'

// Read the backend URL from the Vite environment variable, with a safe default.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Whether to use mock data instead of real API calls.
// Set VITE_USE_MOCK_DATA to "false" in .env once the backend is connected.
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

// Create a reusable axios instance with the backend base URL.
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// --- Project endpoints ---

export async function getProjects() {
  const response = await apiClient.get('/api/projects')
  return response.data
}

export async function getProjectById(projectId) {
  const response = await apiClient.get(`/api/projects/${projectId}`)
  return response.data
}

export async function createProject(projectData) {
  const response = await apiClient.post('/api/projects', projectData)
  return response.data
}

export async function updateProject(projectId, projectData) {
  const response = await apiClient.put(`/api/projects/${projectId}`, projectData)
  return response.data
}

export async function deleteProject(projectId) {
  const response = await apiClient.delete(`/api/projects/${projectId}`)
  return response.data
}

// --- Task endpoints ---

export async function getTasks() {
  const response = await apiClient.get('/api/tasks')
  return response.data
}

export async function getTaskById(taskId) {
  const response = await apiClient.get(`/api/tasks/${taskId}`)
  return response.data
}

export async function createTask(taskData) {
  const response = await apiClient.post('/api/tasks', taskData)
  return response.data
}

export async function updateTask(taskId, taskData) {
  const response = await apiClient.put(`/api/tasks/${taskId}`, taskData)
  return response.data
}

export async function updateTaskStatus(taskId, status) {
  const response = await apiClient.patch(`/api/tasks/${taskId}/status`, { status })
  return response.data
}

export async function deleteTask(taskId) {
  const response = await apiClient.delete(`/api/tasks/${taskId}`)
  return response.data
}

// --- AI endpoints ---

export async function generateAIPlan(requestData) {
  const response = await apiClient.post('/api/ai/plan', requestData)
  return response.data
}

export async function recommendNextTask(requestData) {
  const response = await apiClient.post('/api/ai/next-task', requestData)
  return response.data
}

export async function getAIHistory(projectId) {
  const response = await apiClient.get(`/api/ai/history/${projectId}`)
  return response.data
}

// --- Dashboard & health ---

export async function getDashboardStatistics() {
  const response = await apiClient.get('/api/dashboard')
  return response.data
}

export async function checkBackendHealth() {
  const response = await apiClient.get('/api/health')
  return response.data
}

export default apiClient
