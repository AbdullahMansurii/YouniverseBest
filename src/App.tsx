import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/Layout'
import { Landing } from './components/Landing'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { ProfileSetup } from './components/Profile/ProfileSetup'
import { ProfilePage } from './components/Profile/ProfilePage'
import { BrowsePage } from './components/Browse/BrowsePage'
import { MessagesPage } from './components/Messages/MessagesPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            user ? (
              profile?.profile_completed ? (
                <Navigate to="/browse" replace />
              ) : (
                <Navigate to="/profile/setup" replace />
              )
            ) : (
              <Landing />
            )
          } />
          <Route path="/login" element={user ? <Navigate to="/browse" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/profile/setup" replace /> : <Register />} />
          <Route path="/profile/setup" element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/browse" element={
            <ProtectedRoute>
              <BrowsePage />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App