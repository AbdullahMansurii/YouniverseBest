import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { User, MapPin, BookOpen, Edit2, Save, X, AlertCircle, CheckCircle, Shield, Settings } from 'lucide-react'
import { PasswordChange } from './PasswordChange'

export function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    current_country: profile?.current_country || '',
    status: profile?.status || 'in_india' as 'in_india' | 'abroad',
    destination_country: profile?.destination_country || '',
    current_university: profile?.current_university || '',
    course_field: profile?.course_field || '',
    bio: profile?.bio || ''
  })

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        current_country: profile.current_country || '',
        status: profile.status || 'in_india',
        destination_country: profile.destination_country || '',
        current_university: profile.current_university || '',
        course_field: profile.course_field || '',
        bio: profile.bio || ''
      })
    }
  }, [profile])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user?.id)

      if (error) throw error

      setSuccess('Profile updated successfully!')
      setEditing(false)
      refreshProfile()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-6">
            Welcome to Youniverse! Let's set up your profile so you can start connecting with other students.
          </p>
          <a
            href="/profile/setup"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Set Up Profile
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-orange-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{profile.full_name}</h1>
                  <p className="text-blue-100">{profile.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </button>
                <button
                  onClick={() => setEditing(!editing)}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors flex items-center space-x-2"
                >
                  {editing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
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

            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Country
                    </label>
                    <input
                      type="text"
                      value={formData.current_country}
                      onChange={(e) => setFormData({ ...formData, current_country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
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

                <div className="grid md:grid-cols-2 gap-6">
                  {formData.status === 'in_india' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Destination Country
                      </label>
                      <input
                        type="text"
                        value={formData.destination_country}
                        onChange={(e) => setFormData({ ...formData, destination_country: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  {formData.status === 'abroad' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current University
                      </label>
                      <input
                        type="text"
                        value={formData.current_university}
                        onChange={(e) => setFormData({ ...formData, current_university: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course/Field of Study
                    </label>
                    <input
                      type="text"
                      value={formData.course_field}
                      onChange={(e) => setFormData({ ...formData, course_field: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{updating ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900">Location</h3>
                    </div>
                    <p className="text-gray-700">{profile.current_country}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900">Field of Study</h3>
                    </div>
                    <p className="text-gray-700">{profile.course_field}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                  <p className="text-gray-700">
                    {profile.status === 'in_india' 
                      ? `Looking to study in ${profile.destination_country || 'abroad'}`
                      : `Currently studying at ${profile.current_university}`
                    }
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPasswordChange && (
        <PasswordChange onClose={() => setShowPasswordChange(false)} />
      )}
    </div>
  )
}