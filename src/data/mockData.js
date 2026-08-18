// Mock data for the AI Project Mentor frontend.
// This data simulates what the future FastAPI backend will return.
// Replace these arrays with real API calls in src/services/api.js when the backend is ready.

export const mockProjects = [
  {
    id: 'p1',
    name: 'Student Placement Portal',
    description:
      'A web portal where students can register, upload their resumes, and apply for campus placement drives. Admins can post job openings and shortlist candidates.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2025-07-15T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Hospital Appointment System',
    description:
      'An appointment booking system for a hospital. Patients can book slots with doctors, and doctors can manage their daily schedules.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2025-07-20T09:30:00Z',
  },
  {
    id: 'p3',
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume analysis tool that reviews student resumes and suggests improvements using a GPT-OSS language model.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2025-08-01T14:15:00Z',
  },
]

export const mockTasks = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design student registration form',
    description: 'Create a responsive registration form with name, email, roll number, and password fields.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2025-07-15T11:00:00Z',
    updatedAt: '2025-07-18T10:00:00Z',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Build resume upload feature',
    description: 'Allow students to upload PDF resumes with a 2MB size limit and virus scan validation.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2025-07-16T09:00:00Z',
    updatedAt: '2025-07-20T15:00:00Z',
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Create admin job posting page',
    description: 'Admin dashboard page to create, edit, and delete job postings for placement drives.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2025-07-17T13:00:00Z',
    updatedAt: '2025-07-17T13:00:00Z',
  },
  {
    id: 't4',
    projectId: 'p1',
    title: 'Implement candidate shortlisting API',
    description: 'FastAPI endpoint to shortlist candidates based on eligibility criteria for a job posting.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2025-07-18T10:30:00Z',
    updatedAt: '2025-07-18T10:30:00Z',
  },
  {
    id: 't5',
    projectId: 'p2',
    title: 'Design doctor availability calendar',
    description: 'A calendar UI showing available and booked slots for each doctor on a given day.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2025-07-21T09:00:00Z',
    updatedAt: '2025-07-23T11:00:00Z',
  },
  {
    id: 't6',
    projectId: 'p2',
    title: 'Build patient booking form',
    description: 'A form for patients to select a doctor, choose a date, and book an available time slot.',
    priority: 'Medium',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2025-07-21T10:00:00Z',
    updatedAt: '2025-07-25T14:00:00Z',
  },
  {
    id: 't7',
    projectId: 'p2',
    title: 'Create appointment confirmation email',
    description: 'Send a confirmation email to the patient with appointment details after booking.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2025-07-22T12:00:00Z',
    updatedAt: '2025-07-22T12:00:00Z',
  },
  {
    id: 't8',
    projectId: 'p3',
    title: 'Build resume upload and parsing',
    description: 'Upload a resume PDF and extract text content for AI analysis.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2025-08-01T15:00:00Z',
    updatedAt: '2025-08-05T10:00:00Z',
  },
  {
    id: 't9',
    projectId: 'p3',
    title: 'Integrate GPT-OSS resume analysis',
    description: 'Send extracted resume text to the GPT-OSS model and receive structured improvement suggestions.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2025-08-02T09:00:00Z',
    updatedAt: '2025-08-10T16:00:00Z',
  },
  {
    id: 't10',
    projectId: 'p3',
    title: 'Create suggestion dashboard UI',
    description: 'Display AI-generated suggestions in a clean, sectioned dashboard with score indicators.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2025-08-03T11:00:00Z',
    updatedAt: '2025-08-03T11:00:00Z',
  },
  {
    id: 't11',
    projectId: 'p3',
    title: 'Add resume score history',
    description: 'Store and display previous resume scores so students can track improvement over time.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2025-08-04T13:00:00Z',
    updatedAt: '2025-08-04T13:00:00Z',
  },
  {
    id: 't12',
    projectId: 'p2',
    title: 'Add doctor profile management',
    description: 'Allow doctors to update their specialization, consultation fee, and working hours.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2025-07-24T10:00:00Z',
    updatedAt: '2025-07-24T10:00:00Z',
  },
]

export const mockAIHistory = [
  {
    id: 'ai1',
    projectId: 'p1',
    projectName: 'Student Placement Portal',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'I need to build a student placement portal where students can apply for jobs and admins can shortlist them.',
    aiResponse: {
      requirementUnderstanding:
        'The student placement portal connects students with recruiters. Students register, upload resumes, and apply for jobs. Admins post jobs and shortlist candidates.',
      frontendTasks: [
        'Student registration and login form',
        'Resume upload component with PDF validation',
        'Job listing page with filters',
        'Admin dashboard for job posting management',
      ],
      backendTasks: [
        'Authentication API with JWT tokens',
        'Resume upload endpoint with file validation',
        'Job posting CRUD endpoints',
        'Application submission endpoint',
      ],
      databaseTasks: [
        'Students table with personal and academic details',
        'Jobs table with company and role details',
        'Applications table linking students to jobs',
      ],
      testingSteps: [
        'Test student registration with valid and invalid data',
        'Test resume upload with files over 2MB',
        'Test job application submission',
        'Test admin shortlisting flow',
      ],
      possibleBlockers: [
        'Resume file size limits may need server configuration',
        'Database indexing for large applicant pools',
      ],
      recommendedNextAction:
        'Start with the student registration form and authentication API, as every other feature depends on a logged-in student.',
    },
    modelName: 'GPT-OSS 120B',
    createdAt: '2025-07-16T10:00:00Z',
  },
  {
    id: 'ai2',
    projectId: 'p2',
    projectName: 'Hospital Appointment System',
    taskType: 'Identify Project Blockers',
    userPrompt:
      'What are the possible blockers when building a hospital appointment system with real-time slot availability?',
    aiResponse: {
      requirementUnderstanding:
        'The hospital appointment system needs real-time slot availability to prevent double booking and handle doctor schedule changes.',
      frontendTasks: [
        'Doctor availability calendar component',
        'Real-time slot update indicator',
      ],
      backendTasks: [
        'Slot availability API with concurrency control',
        'Appointment booking endpoint with transaction locking',
      ],
      databaseTasks: [
        'Doctors table with working hours',
        'Appointments table with unique slot constraints',
      ],
      testingSteps: [
        'Test concurrent booking of the same slot',
        'Test doctor schedule updates reflecting in real time',
      ],
      possibleBlockers: [
        'Race conditions when two patients book the same slot simultaneously',
        'Time zone handling for patients and doctors in different regions',
        'Database transaction deadlocks under heavy load',
      ],
      recommendedNextAction:
        'Implement database-level locking on the appointment table to prevent double booking before building the UI.',
    },
    modelName: 'GPT-OSS 120B',
    createdAt: '2025-07-22T14:00:00Z',
  },
  {
    id: 'ai3',
    projectId: 'p3',
    projectName: 'AI Resume Mentor',
    taskType: 'Generate Testing Checklist',
    userPrompt: 'Generate a testing checklist for the AI Resume Mentor application.',
    aiResponse: {
      requirementUnderstanding:
        'The AI Resume Mentor analyzes student resumes and provides improvement suggestions using a GPT-OSS model.',
      frontendTasks: [
        'Test resume upload with valid and invalid file types',
        'Test suggestion dashboard rendering with empty and full data',
      ],
      backendTasks: [
        'Test resume parsing with corrupted PDF files',
        'Test GPT-OSS API timeout handling',
        'Test suggestion response formatting',
      ],
      databaseTasks: [
        'Test resume score history retrieval',
        'Test concurrent user score storage',
      ],
      testingSteps: [
        'Upload a valid PDF resume and verify parsed text',
        'Upload a non-PDF file and verify error message',
        'Upload a corrupted PDF and verify graceful error',
        'Verify AI suggestions display in correct sections',
        'Verify score history updates after a new analysis',
      ],
      possibleBlockers: [
        'GPT-OSS API rate limits during testing',
        'Large PDF files causing parsing timeouts',
      ],
      recommendedNextAction:
        'Create test fixtures with sample PDF resumes of varying sizes before writing automated tests.',
    },
    modelName: 'GPT-OSS 120B',
    createdAt: '2025-08-05T11:00:00Z',
  },
  {
    id: 'ai4',
    projectId: 'p1',
    projectName: 'Student Placement Portal',
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I work on next for the placement portal?',
    aiResponse: {
      requirementUnderstanding:
        'The placement portal has registration and resume upload partially complete. The next logical step is enabling the job application flow.',
      frontendTasks: [
        'Job listing page for students',
        'Apply button on each job card',
      ],
      backendTasks: [
        'Application submission endpoint',
        'Eligibility check based on student criteria',
      ],
      databaseTasks: [
        'Applications table with foreign keys to students and jobs',
      ],
      testingSteps: [
        'Test application submission for an eligible student',
        'Test application rejection for an ineligible student',
      ],
      possibleBlockers: [
        'Eligibility criteria need to be finalized before building the check',
      ],
      recommendedNextAction:
        'Build the job listing page first so students can see available placements before the apply flow is added.',
    },
    modelName: 'GPT-OSS 120B',
    createdAt: '2025-08-12T09:00:00Z',
  },
]

// Helper to produce a mock AI response for the AI Mentor page.
export function generateMockAIResponse(projectName, requirement, taskType) {
  return {
    requirementUnderstanding: `For the project "${projectName}", the requirement "${requirement}" will be addressed using the "${taskType}" approach. The system needs to break this into manageable frontend, backend, and database tasks.`,
    frontendTasks: [
      `Create a responsive UI component for "${requirement}"`,
      'Add form validation and user feedback messages',
      'Connect the UI to the backend API endpoints',
      'Handle loading and error states gracefully',
    ],
    backendTasks: [
      `Create a FastAPI endpoint to handle the "${requirement}" logic`,
      'Add request validation and error handling',
      'Implement business logic with proper status codes',
      'Add authentication checks where needed',
    ],
    databaseTasks: [
      'Design the required table schema',
      'Add foreign key relationships to existing tables',
      'Create indexes for frequently queried columns',
    ],
    testingSteps: [
      'Write unit tests for the new API endpoint',
      'Test the frontend form with valid and invalid inputs',
      'Test database operations with sample data',
      'Verify the full flow end-to-end',
    ],
    possibleBlockers: [
      'API rate limits from the AI model provider',
      'Database migration may be needed before deployment',
      'Authentication flow must be completed before testing',
    ],
    recommendedNextAction: `Start by creating the database table and FastAPI endpoint for "${requirement}", then build the frontend form to connect to it.`,
  }
}
