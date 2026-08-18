// Main application layout: sidebar + header + page content area.
// Manages the mobile sidebar open/close state.

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={setSearchTerm}
        />
        <main className="app-content">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  )
}
