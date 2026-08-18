// Application top header with page title, search, notifications, and profile.

import { useLocation } from 'react-router-dom'

// Map route paths to human-readable page titles.
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
}

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/projects/')) return 'Project Details'
  return 'Page Not Found'
}

export default function Header({ onMenuClick, onSearch }) {
  const location = useLocation()
  const title = getPageTitle(location.pathname)

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <button className="header-icon-btn" aria-label="Notifications">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="header-notification-dot" aria-hidden="true" />
        </button>

        <div className="header-profile" aria-label="User profile">
          <div className="header-avatar">AP</div>
          <div className="header-profile-info">
            <span className="header-profile-name">Admin User</span>
            <span className="header-profile-role">Project Manager</span>
          </div>
        </div>
      </div>
    </header>
  )
}
