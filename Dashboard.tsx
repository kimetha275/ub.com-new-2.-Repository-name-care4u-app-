import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { 
  Heart, LogOut, Users, Activity, Pill, Camera, 
  Plus, Clock, TrendingUp, Bell 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DailyActivity, CareRecipient, Photo } from '../types'

export default function Dashboard() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [recipients, setRecipients] = useState<CareRecipient[]>([])
  const [activities, setActivities] = useState<DailyActivity[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [newActivity, setNewActivity] = useState({
    activity_type: 'meal',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [profile])

  const loadData = async () => {
    if (!profile) return

    try {
      // Load care recipients
      const { data: recipientsData } = await supabase
        .from('care_recipients')
        .select('*')
        .limit(10)

      setRecipients(recipientsData || [])

      // Load recent activities
      const { data: activitiesData } = await supabase
        .from('daily_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      setActivities(activitiesData || [])

      // Load recent photos
      const { data: photosData } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)

      setPhotos(photosData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipients[0]) return

    try {
      await supabase.from('daily_activities').insert({
        recipient_id: recipients[0].id,
        caregiver_id: profile?.id,
        activity_type: newActivity.activity_type,
        notes: newActivity.notes,
      })

      setShowActivityForm(false)
      setNewActivity({ activity_type: 'meal', notes: '' })
      loadData()
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your dashboard...</div>
      </div>
    )
  }

  const isCaregiver = profile?.user_type === 'caregiver'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Care4U</h1>
                <p className="text-sm text-gray-600">Welcome, {profile?.full_name || 'User'}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Care Recipients</p>
                <p className="text-2xl font-bold text-gray-900">{recipients.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Activities Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activities.filter(a => 
                    new Date(a.activity_date).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-secondary" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Photos Shared</p>
                <p className="text-2xl font-bold text-gray-900">{photos.length}</p>
              </div>
              <Camera className="h-8 w-8 text-accent" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Bell className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - Only for Caregivers */}
            {isCaregiver && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setShowActivityForm(!showActivityForm)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-primary bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <Plus className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Log Activity</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-blue-50 transition">
                    <Pill className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium">Medication</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-blue-50 transition">
                    <Camera className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium">Add Photo</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-blue-50 transition">
                    <TrendingUp className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium">Vitals</span>
                  </button>
                </div>
              </div>
            )}

            {/* Activity Form */}
            {showActivityForm && isCaregiver && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Log New Activity</h3>
                <form onSubmit={handleLogActivity} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Type
                    </label>
                    <select
                      value={newActivity.activity_type}
                      onChange={(e) => setNewActivity({ ...newActivity, activity_type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                      <option value="meal">Meal</option>
                      <option value="medication">Medication</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="exercise">Exercise</option>
                      <option value="vitals">Vitals Check</option>
                      <option value="bath">Bath/Shower</option>
                      <option value="social">Social Activity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newActivity.notes}
                      onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="Add any additional details..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-600 transition"
                    >
                      Save Activity
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowActivityForm(false)}
                      className="px-6 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No activities logged yet</p>
              ) : (
                <div className="space-y-3">
                  {activities.slice(0, 10).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium capitalize">{activity.activity_type.replace('_', ' ')}</p>
                        {activity.notes && (
                          <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(activity.activity_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Care Recipients */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Care Recipients</h2>
              {recipients.length === 0 ? (
                <p className="text-gray-500 text-sm">No recipients assigned</p>
              ) : (
                <div className="space-y-3">
                  {recipients.map((recipient) => (
                    <div key={recipient.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        {recipient.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{recipient.full_name}</p>
                        {recipient.date_of_birth && (
                          <p className="text-xs text-gray-500">
                            Age: {Math.floor((new Date().getTime() - new Date(recipient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Recent Photos</h2>
              {photos.length === 0 ? (
                <p className="text-gray-500 text-sm">No photos yet</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {photos.slice(0, 4).map((photo) => (
                    <div key={photo.id} className="aspect-square rounded-lg bg-gray-200" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
