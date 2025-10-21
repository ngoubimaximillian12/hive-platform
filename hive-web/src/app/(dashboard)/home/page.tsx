'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function HomePage() {
  const router = useRouter(); // FIXED: Added router declaration
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    nearbyUsers: 0,
    activeDeals: 0,
    upcomingEvents: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
    fetchStats();
    fetchRecentActivity();
    fetchNearbyUsers();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      router.push('/login');
    }
  };

  const fetchStats = async () => {
    try {
      const [users, deals, events] = await Promise.all([
        apiClient.get('/users/nearby'),
        apiClient.get('/deals'),
        apiClient.get('/events')
      ]);
      
      setStats({
        totalUsers: 127,
        nearbyUsers: users.data?.length || 0,
        activeDeals: deals.data?.length || 0,
        upcomingEvents: events.data?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await apiClient.get('/posts');
      setRecentActivity(response.data?.slice(0, 5) || []);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    }
  };

  const fetchNearbyUsers = async () => {
    try {
      const response = await apiClient.get('/users/nearby');
      setNearbyUsers(response.data?.slice(0, 6) || []);
    } catch (error) {
      console.error('Failed to fetch nearby users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐝</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Hive</span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => router.push('/home')} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">Home</button>
              <button onClick={() => router.push('/skills')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Skills</button>
              <button onClick={() => router.push('/deals')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Deals</button>
              <button onClick={() => router.push('/events')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Events</button>
              <button onClick={() => router.push('/community')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Community</button>
              <button onClick={() => router.push('/messages')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Messages</button>
              <button onClick={() => router.push('/discover')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Discover</button>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/profile')} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
              </button>
              <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening in your neighborhood</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div className="text-sm opacity-90 mb-1">Total Users</div>
            <div className="text-4xl font-black">{stats.totalUsers}</div>
            <div className="text-sm opacity-75 mt-2">in your area</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div className="text-sm opacity-90 mb-1">Nearby</div>
            <div className="text-4xl font-black">{stats.nearbyUsers}</div>
            <div className="text-sm opacity-75 mt-2">neighbors</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div className="text-sm opacity-90 mb-1">Active Deals</div>
            <div className="text-4xl font-black">{stats.activeDeals}</div>
            <div className="text-sm opacity-75 mt-2">save money</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div className="text-sm opacity-90 mb-1">Events</div>
            <div className="text-4xl font-black">{stats.upcomingEvents}</div>
            <div className="text-sm opacity-75 mt-2">this week</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push('/skills')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 text-left"
          >
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Trade Skills</h3>
            <p className="text-gray-600 text-sm">Offer your skills or learn from neighbors</p>
          </button>

          <button
            onClick={() => router.push('/deals')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 text-left"
          >
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Group Deals</h3>
            <p className="text-gray-600 text-sm">Save money by buying together</p>
          </button>

          <button
            onClick={() => router.push('/events')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 text-left"
          >
            <div className="text-4xl mb-3">��</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Join Events</h3>
            <p className="text-gray-600 text-sm">Connect at local gatherings</p>
          </button>
        </div>

        {/* Recent Activity & Nearby Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {activity.first_name?.[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.first_name} {activity.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{activity.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              )}
            </div>
          </div>

          {/* Nearby Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">👥 Nearby Neighbors</h2>
            <div className="grid grid-cols-2 gap-4">
              {nearbyUsers.length > 0 ? (
                nearbyUsers.map((user) => (
                  <div key={user.id} className="text-center p-4 border rounded-xl hover:shadow-md transition cursor-pointer" onClick={() => router.push(`/messages?user=${user.id}`)}>
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">{user.first_name}</h3>
                    <p className="text-xs text-gray-500">0.5 miles away</p>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-gray-500 text-center py-8">No nearby users</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
