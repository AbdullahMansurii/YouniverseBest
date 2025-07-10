import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { 
  Users, 
  MessageCircle, 
  User, 
  Globe, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Bell,
  ArrowRight
} from 'lucide-react'

export function Dashboard() {
  const { user, profile } = useAuth()

  const quickStats = [
    {
      title: 'Connections',
      value: '12',
      icon: Users,
      color: 'bg-blue-500',
      change: '+2 this week'
    },
    {
      title: 'Messages',
      value: '8',
      icon: MessageCircle,
      color: 'bg-green-500',
      change: '3 unread'
    },
    {
      title: 'Profile Views',
      value: '24',
      icon: User,
      color: 'bg-purple-500',
      change: '+5 this week'
    }
  ]

  const recentActivity = [
    {
      type: 'connection',
      message: 'New connection request from Priya Sharma',
      time: '2 hours ago',
      icon: Users
    },
    {
      type: 'message',
      message: 'Message from Arjun at Stanford University',
      time: '5 hours ago',
      icon: MessageCircle
    },
    {
      type: 'profile',
      message: 'Your profile was viewed by 3 students',
      time: '1 day ago',
      icon: User
    }
  ]

  const quickActions = [
    {
      title: 'Browse Students',
      description: 'Find and connect with students abroad',
      icon: Globe,
      link: '/browse',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'View Messages',
      description: 'Check your conversations',
      icon: MessageCircle,
      link: '/messages',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: User,
      link: '/profile',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening in your Youniverse
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-start space-x-4">
                    <action.icon className="h-8 w-8 text-gray-700 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        Get started <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Profile Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{profile?.full_name}</h4>
                    <p className="text-sm text-gray-600">
                      {profile?.status === 'abroad' 
                        ? `Studying in ${profile?.current_country}` 
                        : `Looking to study in ${profile?.destination_country || 'abroad'}`
                      }
                    </p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to="/messages"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  View all activity →
                </Link>
              </div>
            </div>

            {/* Tips & Suggestions */}
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 mt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tip of the Day</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete your profile with more details about your academic interests to get better connection matches!
                  </p>
                  <Link
                    to="/profile"
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Update Profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}