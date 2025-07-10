import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { User, MapPin, BookOpen, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export function ProfileSetup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    full_name: '',
    current_country: '',
    status: 'in_india' as 'in_india' | 'abroad',
    destination_country: '',
    current_university: '',
    course_field: '',
    bio: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!user) {
      setError('Please sign in first')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email!,
          profile_completed: true,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess('Profile created successfully!')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-2 text-gray-600">Help others find and connect with you</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="current_country" className="block text-sm font-medium text-gray-700 mb-2">
                Current Country *
              </label>
              <input
                id="current_country"
                type="text"
                required
                value={formData.current_country}
                onChange={(e) => setFormData({ ...formData, current_country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., India, USA, Canada"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="in_india"
                    checked={formData.status === 'in_india'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'in_india' | 'abroad' })}
                    className="mr-2"
                  />
                  <span className="text-sm">I'm currently in India and want to study abroad</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="abroad"
                    checked={formData.status === 'abroad'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'in_india' | 'abroad' })}
                    className="mr-2"
                  />
                  <span className="text-sm">I'm currently studying abroad</span>
                </label>
              </div>
            </div>

            {formData.status === 'in_india' && (
              <div>
                <label htmlFor="destination_country" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Destination Country
                </label>
                <input
                  id="destination_country"
                  type="text"
                  value={formData.destination_country}
                  onChange={(e) => setFormData({ ...formData, destination_country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., USA, Canada, UK, Australia"
                />
              </div>
            )}

            {formData.status === 'abroad' && (
              <div>
                <label htmlFor="current_university" className="block text-sm font-medium text-gray-700 mb-2">
                  Current University
                </label>
                <input
                  id="current_university"
                  type="text"
                  value={formData.current_university}
                  onChange={(e) => setFormData({ ...formData, current_university: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., MIT, Stanford, University of Toronto"
                />
              </div>
            )}

            <div>
              <label htmlFor="course_field" className="block text-sm font-medium text-gray-700 mb-2">
                Course/Field of Study *
              </label>
              <input
                id="course_field"
                type="text"
                required
                value={formData.course_field}
                onChange={(e) => setFormData({ ...formData, course_field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Computer Science, Business, Engineering"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Bio *
              </label>
              <textarea
                id="bio"
                required
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself, your goals, and what you're looking for..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating profile...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}