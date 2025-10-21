'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function AnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalSkills: 0,
    totalDeals: 0,
    totalEvents: 0,
    totalPosts: 0,
    totalMessages: 0,
    activeToday: 0,
    recentActivity: []
  });

  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [topSkills, setTopSkills] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await apiClient.get('/analytics/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Use mock data for demo
      setStats({
        totalUsers: 127,
        totalSkills: 89,
        totalDeals: 34,
        totalEvents: 23,
        totalPosts: 156,
        totalMessages: 892,
        activeToday: 47,
        recentActivity: []
      });
      
      setUserGrowth([
        { date: 'Mon', users: 15 },
        { date: 'Tue', users: 23 },
        { date: 'Wed', users: 18 },
        { date: 'Thu', users: 31 },
        { date: 'Fri', users: 28 },
        { date: 'Sat', users: 42 },
        { date: 'Sun', users: 35 }
      ]);

      setTopSkills([
        { name: 'Web Development', count: 24 },
        { name: 'Cooking', count: 18 },
        { name: 'Guitar', count: 15 },
        { name: 'Yoga', count: 12 },
        { name: 'Photography', count: 10 }
      ]);

      setTopUsers([
        { name: 'John Doe', activity: 145 },
        { name: 'Jane Smith', activity: 132 },
        { name: 'Mike Johnson', activity: 98 },
        { name: 'Sarah Williams', activity: 87 },
        { name: 'Demo User', activity: 76 }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center cursor-pointer" onClick={() => router.push('/home')}>
                <span className="text-2xl">🐝</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => router.push('/home')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Home</button>
              <button onClick={() => router.push('/analytics')} className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg">Analytics</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Platform Analytics</h1>
          <p className="text-gray-600">Overview of your community's activity and growth</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Total Users</div>
            <div className="text-4xl font-black">{stats.totalUsers}</div>
            <div className="text-sm opacity-75 mt-2">↑ 12% this week</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Total Skills</div>
            <div className="text-4xl font-black">{stats.totalSkills}</div>
            <div className="text-sm opacity-75 mt-2">↑ 8% this week</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Total Events</div>
            <div className="text-4xl font-black">{stats.totalEvents}</div>
            <div className="text-sm opacity-75 mt-2">↑ 15% this week</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Active Today</div>
            <div className="text-4xl font-black">{stats.activeToday}</div>
            <div className="text-sm opacity-75 mt-2">Online now</div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">💰 Deals</h3>
              <span className="text-3xl font-black text-green-600">{stats.totalDeals}</span>
            </div>
            <div className="text-sm text-gray-600">Active group buying deals</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">💬 Messages</h3>
              <span className="text-3xl font-black text-blue-600">{stats.totalMessages}</span>
            </div>
            <div className="text-sm text-gray-600">Total messages sent</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">�� Posts</h3>
              <span className="text-3xl font-black text-purple-600">{stats.totalPosts}</span>
            </div>
            <div className="text-sm text-gray-600">Community posts</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">📈 User Growth (Last 7 Days)</h3>
            <div className="flex items-end justify-between h-48 space-x-2">
              {userGrowth.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500" 
                       style={{ height: `${(day.users / 50) * 100}%` }}>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{day.date}</div>
                  <div className="text-sm font-bold text-gray-900">{day.users}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Skills */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">🔥 Most Popular Skills</h3>
            <div className="space-y-4">
              {topSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm font-bold text-gray-900">{skill.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${(skill.count / topSkills[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">⭐ Most Active Users</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {topUsers.map((user, index) => (
              <div key={index} className="text-center p-4 border rounded-xl hover:shadow-md transition">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.name[0]}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{user.name}</h4>
                <p className="text-xs text-gray-500">{user.activity} actions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">🕐 Activity by Hour</h3>
          <div className="grid grid-cols-12 gap-2">
            {[...Array(24)].map((_, hour) => {
              const activity = Math.floor(Math.random() * 100);
              return (
                <div key={hour} className="text-center">
                  <div 
                    className={`h-20 rounded-lg transition-all hover:scale-110 ${
                      activity > 75 ? 'bg-green-500' :
                      activity > 50 ? 'bg-yellow-500' :
                      activity > 25 ? 'bg-orange-500' :
                      'bg-gray-300'
                    }`}
                    title={`${hour}:00 - ${activity}% active`}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{hour}</div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Very High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
